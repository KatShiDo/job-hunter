import { errorHandler } from "./error.js";

export const validateCredentials = (request, response, next) => {
  const { username, email, password } = request.body;

  if (password && password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }

  if (username) {
    if (username < 5 || username > 20) {
      return next(
        errorHandler(400, "Username must be betweet 5 and 20 characters")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  if (email) {
    if (
      !email.match(
        /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/
      )
    ) {
      return next(errorHandler(400, "Wrong email format"));
    }
  }

  next();
};
