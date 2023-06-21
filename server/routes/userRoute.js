import express from "express";

const userRouter = express();

import {
  deleteUserProfile,
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserPassword,
  updateUserProfile,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { upload } from "../utils/fileUplaod.js";

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/profile", protect, getUserProfile);

userRouter.put(
  "/profile/update",
  upload.single("avatar"),
  protect,
  updateUserProfile
);

userRouter.put("/profile/password/update", protect, updateUserPassword);

userRouter.delete("/profile/delete", protect, deleteUserProfile);

userRouter.post("/forgot/password", forgotPassword);

userRouter.put("/resetpassword/:resetToken", resetPassword);

export default userRouter;
