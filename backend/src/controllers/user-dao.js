/**
 * User controllers handling CRUD operations.
 */

import User from "../models/Users-schema.js";
import bcrypt from "bcrypt";

//Get all users
export const getUsers = async (req, res) => {
  console.log("it works!");
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

//Get single user
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user" });
  }
};

//Update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    let updatedPassword = null;

    let updateData = { ...inputs };
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
      updateData.password = updatedPassword;
    }

    if (avatar) {
      updateData.avatar = avatar; // Add avatar if provided
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
    console.log(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
