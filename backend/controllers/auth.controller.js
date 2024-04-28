import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
      response.status(200).send(dbResponse);
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

  const validUser = User.findOne({ username })
    .then((dbResponse) => {
      if (!dbResponse) {
        return next(errorHandler(404, "User not found"));
      }
      const validPassword = bcryptjs.compareSync(password, dbResponse.password);
      if (!validPassword) {
        return next(errorHandler(400, "Invalid password"));
      }
      const token = jwt.sign(
        {
          id: dbResponse._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30m",
        }
      );

      // We don't want password to be sended
      // @ts-ignore
      const { password: pass, ...rest } = dbResponse._doc;

      response
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    })
    .catch((error) => {
      return next(error);
    });
};
