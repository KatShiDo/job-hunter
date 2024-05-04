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
        /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/
      )
    ) {
      return next(errorHandler(400, "Wrong email format"));
    }
  }

  next();
};
