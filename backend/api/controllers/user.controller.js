import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Hello World!" });
};

export const updateUser = async (req, res, next) => {
  // Check if the user has permission to update
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const updateData = {};

    // Only include fields if they are present
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) {
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.avatar) updateData.avatar = req.body.avatar;
    console.log("Update username:", req.body.username);
    console.log("Update email:", req.body.email);
    console.log("Update password:", req.body.password);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    console.log("Update Data:", updateData);

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Check if the user has permission to delete
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  console.log("Attempting to delete user with ID:", req.params.id);

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Clear the authentication cookie
    res.clearCookie("access_token", {
      httpOnly: true,
    });

    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  // Check if the user has permission to view
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your own listings!"));
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });

    if (!listings.length) {
      return next(errorHandler(404, "No listings found for this user!"));
    }

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
