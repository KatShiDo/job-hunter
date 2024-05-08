import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import AuthDto from "../dtos/auth.dto.js";
import RefreshToken from "../models/refreshToken.model.js";
import RefreshDto from "../dtos/refresh.dto.js";
import UserDto from "../dtos/user.dto.js";

const updateRefreshToken = async (userId, fingerprint, next) => {
  try {
    const refreshTokens = await RefreshToken.find({ userId });
    if (refreshTokens.length >= 5) {
      await RefreshToken.deleteMany({ userId }).exec();
    }
    await RefreshToken.deleteOne({ fingerprint }).exec();
    const newRefreshToken = new RefreshToken({ userId, fingerprint });
    const savedRefreshToken = await newRefreshToken.save();
    // console.log("SAVED", savedRefreshToken);
    return savedRefreshToken;
  } catch (error) {
    next(error);
  }
};

const sendAuthSuccessResponse = (dbResponse, apiResponse, next) => {
  const userDto = new UserDto(dbResponse);
  apiResponse.status(200).send(userDto);
};

const sendSignInSuccessResponse = (
  dbResponse,
  apiResponse,
  fingerprint,
  next
) => {
  const accessToken = jwt.sign(
    {
      id: dbResponse._id,
      isAdmin: dbResponse.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  updateRefreshToken(dbResponse._id, fingerprint, next).then((refreshToken) => {
    // console.log("RefreshTokenxd", refreshToken);
    const authDto = new AuthDto(dbResponse);
    authDto.accessToken = accessToken;

    // console.log("AuthDto", authDto);
    apiResponse
      .status(200)
      .cookie("refreshToken", refreshToken._id, {
        httpOnly: true,
        expires: refreshToken.expirationDate,
      })
      .send(authDto);
  });
};

export const register = (request, response, next) => {
  const { username, email, password, fingerprint } = request.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "Missing required fields"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  newUser
    .save()
    .then((dbResponse) => {
      sendSignInSuccessResponse(dbResponse, response, fingerprint, next);
    })
    .catch((error) => {
      return next(error);
    });
};

export const login = (request, response, next) => {
  const { username, password, fingerprint } = request.body;

  if (!username || !password || username === "" || password === "") {
    return next(errorHandler(400, "Missing required fields"));
  }

  User.findOne({ username })
    .then((validUser) => {
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, "Invalid password"));
      }
      sendSignInSuccessResponse(validUser, response, fingerprint, next);
    })
    .catch((error) => {
      return next(error);
    });
};

export const google = (request, response, next) => {
  const { username, email, avatar, fingerprint } = request.body;
  User.findOne({ email })
    .then((validUser) => {
      if (validUser) {
        sendSignInSuccessResponse(validUser, response, fingerprint, next);
      } else {
        const randomPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(randomPassword, 10);
        const newUser = new User({
          username:
            username.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          password: hashedPassword,
          email: email,
          avatar: avatar,
        });
        newUser.save().then((dbResponse) => {
          sendSignInSuccessResponse(dbResponse, response, fingerprint, next);
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

export const logout = (request, response, next) => {
  try {
    response
      .clearCookie("refreshToken")
      .status(200)
      .send("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const refresh = (request, response, next) => {
  const refreshTokenId = request.cookies.refreshToken;
  if (!refreshTokenId) {
    return next(errorHandler(400, "No refreshToken cookie"));
  }
  RefreshToken.findByIdAndDelete(refreshTokenId)
    .then((oldRefreshTokenResponse) => {
      // console.log("DELETED", oldRefreshTokenResponse);
      const newRefreshToken = new RefreshToken({
        userId: oldRefreshTokenResponse.userId,
        fingerprint: oldRefreshTokenResponse.fingerprint,
      });
      newRefreshToken
        .save()
        .then((t) => t.populate("userId"))
        .then((newRefreshTokenResponse) => {
          // console.log("SAVED_REFRESHED", newRefreshTokenResponse);
          const accessToken = jwt.sign(
            {
              id: newRefreshTokenResponse.userId._id,
              isAdmin: newRefreshTokenResponse.userId.isAdmin,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30m",
            }
          );
          const refreshDto = new RefreshDto(accessToken);

          response
            .status(200)
            .cookie("refreshToken", newRefreshTokenResponse._id, {
              httpOnly: true,
              expires: newRefreshTokenResponse.expirationDate,
            })
            .send(refreshDto);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

export const jwtAuth = (request, response, next) => {
  User.findById(request.user.id)
    .then((dbResponse) => {
      sendAuthSuccessResponse(dbResponse, response, next);
    })
    .catch((error) => {
      next(error);
    });
};
