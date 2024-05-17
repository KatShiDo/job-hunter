import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (request, response, next) => {
  const authHeader = request.header("Authorization");
  if (!authHeader) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return next(errorHandler(401, "Unauthorized"));
    }
    // console.log(decoded.exp);
    const expirationDate = new Date(decoded.exp * 1000);
    // console.log("EXPIRE_ACCESS", expirationDate);
    if (expirationDate < Date.now()) {
        return next(errorHandler(401, "Access token is expired"));
    }
    // console.log("DECODED", decoded);
    request.user = decoded;
    next();
  });
};
