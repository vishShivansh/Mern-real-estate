import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const isProduction = process.env.NODE_ENV === "production";

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!isProduction) {
      // Log JWT secret for debugging (ensure this is removed before production)
      console.log("JWT Secret:", process.env.JWT_SECRET); // Use this cautiously
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    if (!isProduction) {
      // Log generated token for debugging (ensure this is removed before production)
      console.log("Generated Token: ", token); // Use this cautiously
    }
    const { password: pass, ...restInfo } = validUser._doc;
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     secure: isProduction, // dev me false, prod me true
    //     path: "/",
    //     sameSite: isProduction ? "None" : "Lax",
    //   })
    //   .status(200)
    //   .json(restInfo);
    // console.log("Set-Cookie Header: ", res.getHeaders()["set-cookie"]);

    // ⚡ Cookie ke bajay direct JSON response bhej
    res.status(200).json({ token, user: restInfo });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      if (!isProduction) {
        console.log("JWT Secret:", process.env.JWT_SECRET);
        console.log("Generated Token: ", token);
      }
      const { password: pass, ...rest } = user._doc;
      // res
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //     secure: isProduction, // dev me false, prod me true
      //     path: "/",
      //     sameSite: isProduction ? "None" : "Lax",
      //   })
      //   .status(200)
      //   .json(rest);
      // console.log("Set-Cookie Header: ", res.getHeaders()["set-cookie"]);

      // ⚡ Cookie ke bajay direct JSON response bhej
      res.status(200).json({ token, user: restInfo });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const { password: pass, ...rest } = newUser._doc;
      // res
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //     secure: isProduction, // dev me false, prod me true
      //     path: "/",
      //     sameSite: isProduction ? "None" : "Lax",
      //   })
      //   .status(200)
      //   .json(rest);
      // console.log("Set-Cookie Header: ", res.getHeaders()["set-cookie"]);

      // ⚡ Cookie ke bajay direct JSON response bhej
      res.status(200).json({ token, user: restInfo });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // res.clearCookie("access_token", {
    //   httpOnly: true,
    // });
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
