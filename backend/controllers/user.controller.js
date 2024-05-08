import UserDto from "../dtos/user.dto.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const getUsers = (request, response) => {
  response.json({ message: "API is working" });
};

export const updateUser = (request, response, next) => {
  // console.log(request.user);
  // console.log(request.params.userId);
  if (request.user.id != request.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (request.body.password) {
    request.body.password = bcryptjs.hashSync(request.body.password, 10);
  }
  User.findByIdAndUpdate(
    request.params.userId,
    {
      $set: {
        username: request.body.username,
        email: request.body.email,
        avatar: request.body.avatar,
        password: request.body.password,
      },
    },
    { new: true }
  )
    .then((dbResponse) => {
      const userDto = new UserDto(dbResponse);
      response.status(200).send(userDto);
    })
    .catch((error) => next(error));
};

export const deleteUser = (request, response, next) => {
  if (request.user.id != request.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account")
    );
  }
  User.findByIdAndDelete(request.params.userId)
    .then(() => {
      response.status(200).send("User has been deleted");
    })
    .catch((error) => {
      next(error);
    });
};
