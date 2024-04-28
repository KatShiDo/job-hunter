import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
    next(errorHandler(400, "Missing required fields"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  newUser
    .save()
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      next(error);
    });
};
