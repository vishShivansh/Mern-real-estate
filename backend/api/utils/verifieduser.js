import jwt from "jsonwebtoken";
import { isProduction } from "../controllers/auth.controller.js";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  // if (!isProduction) {
  //   console.log("Responsessssssssssss:", res); // Log all cookies
  //   console.log("Req:", req); // Log all cookies
  //   console.log("Cookies:", req.cookies); // Log all cookies
  //   console.log("Token:", token); // Add this line to log the token
  // }
  const authHeader = req.headers["authorization"]; // "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "No token, authorization denied!"));
  }
  const token = authHeader && authHeader.split(" ")[1]; // extract token

  if (!isProduction) {
    console.log("Auth Header:", authHeader);
    console.log("Extracted Token:", token);
  }
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
