import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import AuthDto from "../dtos/auth.dto.js";

const sendSignInSuccessResponse = (dbResponse, apiResponse) => {
  const accessToken = jwt.sign(
    {
      id: dbResponse._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  const authDto = new AuthDto(dbResponse);
  authDto.accessToken = accessToken;

  apiResponse
    .status(200)
    .cookie("refreshToken", accessToken, {
      httpOnly: true,
    })
    .send(authDto);
};

export const register = (request, response, next) => {
  const { username, email, password } = request.body;

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
      sendSignInSuccessResponse(dbResponse, response);
    })
    .catch((error) => {
      return next(error);
    });
};

export const login = (request, response, next) => {
  const { username, password } = request.body;

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
      sendSignInSuccessResponse(validUser, response);
    })
    .catch((error) => {
      return next(error);
    });
};

export const google = (request, response, next) => {
  const { username, email, avatar } = request.body;
  console.log(username);
  console.log(email);
  console.log(avatar);
  User.findOne({ email })
    .then((validUser) => {
      if (validUser) {
        sendSignInSuccessResponse(validUser, response);
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
          sendSignInSuccessResponse(dbResponse, response);
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
