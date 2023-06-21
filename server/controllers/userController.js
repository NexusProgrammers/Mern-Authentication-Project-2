import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import validator from "validator";
import generateToken from "../utils/generateToken.js";
import Token from "../models/tokenModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// register user
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Required Fields",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Valid Email",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "User Already Exists",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password At Least 6 Characters Required",
    });
  }

  // create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { _id, name, email } = user;
    generateToken(res, _id);
    return res.status(201).json({
      _id,
      name,
      email,
      success: true,
      message: "Register Successful",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid User Data",
    });
  }
});

// login user
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Required Fields",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Valid Email",
    });
  }
  // find user in the mongodb
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email Not Registered",
    });
  }
  //is password correct
  const isPasswordCorrect = await user.matchPasswords(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email OR Password",
    });
  }

  if (user) {
    const { _id, name, email, photo } = user;
    generateToken(res, _id);
    return res.status(201).json({
      _id,
      name,
      email,
      photo,
      success: true,
      message: "Login Successful",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid User Data",
    });
  }
});

// logout user
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // directly expires the cookie
  });

  return res.status(200).json({
    success: true,
    message: "Logout Successfull",
  });
});

// get user profile
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, photo } = user;

  res.status(200).json({
    success: true,
    name,
    email,
    photo,
  });
});

// update user profile
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo } = user;
    user.name = req.body.name || name;
    user.email = req.body.email || email;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      success: true,
      message: "Account Updated",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
});

// update user password
export const updateUserPassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Not Found",
    });
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Required Fields",
    });
  }

  const isOldPasswordCorrect = await user.matchPasswords(oldPassword);

  if (!isOldPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid Old Password",
    });
  }

  if (oldPassword === newPassword) {
    return res.status(401).json({
      success: false,
      message: "New password must be different from the old password",
    });
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password Updated Successful",
  });
});

// delete user profile
export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please enter your password",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordCorrect = await user.matchPasswords(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  await User.deleteOne({ _id: user._id });

  res.cookie("token", "", {
    path: "/",
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// forgot password
export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({
      success: false,
      message: "Please enter your email",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(401).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email not registered",
    });
  }

  await Token.deleteMany({ userId: user._id });

  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const tokenExpiration = Date.now() + 5 * 60 * 1000; // Five minutes from now

  await Token.create({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: tokenExpiration,
  });

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `
  <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
    <h2 style="color: #333;">Hello ${user.name},</h2>
    <p style="color: #333;">You are receiving this email because a password reset request was made</p>
    <p style="color: #333;">Please use the button below to reset your password:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
    </div>
    <p style="color: #333;">This reset link is valid for only 5 minutes.</p>
    <p style="color: #333;">Please check your spam folder if you do not see this email in your inbox.</p>
    <p style="color: #333;">Regards,</p>
    <p style="color: #333;">Our Team</p>
  </div>
`;

  const subject = "Password Reset Request";
  const sendTo = user.email;
  const sentFrom = process.env.USER_EMAIL;

  try {
    await sendEmail(subject, message, sendTo, sentFrom);
    res.status(200).json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email, please try again",
    });
  }
});

// reset password
export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  if (!password) {
    return res.status(401).json({
      success: false,
      message: "please enter a password",
    });
  }

  if (password.length < 6) {
    return res.status(401).json({
      success: false,
      message: "password must be at least 6 characters",
    });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(404).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }

  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;

  await user.save();

  await Token.deleteMany({ userId: user._id });

  res.status(200).json({
    success: true,
    message: "Password Reset Successful, Please Login",
  });
});
