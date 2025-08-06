import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;

  // check if the user is already exists
  const alreadyExists = await User.findOne({ email });

  if (alreadyExists) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      addresses: user.addresses,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if the user is already exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email does not exists");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      addresses: user.addresses,
      token: generateToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { registerUser, loginUser };
