/**
 * User authentication controllers for registration, login, and logout operations.
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users-schema.js";

//Create user
export const register = async (req, res) => {
  const { username, password, tags, displayName, email, avatarPath } = req.body;

  //Validate fileds
  if (!(username || password)) {
    next("Provide Required Fields!");
    return;
  }

  try {
    const userExist = await User.findOne({ username });

    if (userExist) {
      return res.status(409).json({ message: "Username already exists" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //Create new user amd save to database
    const user = await User.create({
      username,
      password: hashedPassword,
      tags,
      displayName,
      email,
      avatarPath,
    });
    console.log(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

//Login

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //Check if the user exsits

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User doesn't exist!" });

    //Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Generate cookie token and send to the user

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

//Logout

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
};
