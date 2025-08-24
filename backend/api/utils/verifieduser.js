import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Responsessssssssssss:", res); // Log all cookies
  console.log("Req:", req); // Log all cookies
  console.log("Cookies:", req.cookies); // Log all cookies
  console.log("Token:", token); // Add this line to log the token
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }
    req.user = user;

    next();
  });
};
