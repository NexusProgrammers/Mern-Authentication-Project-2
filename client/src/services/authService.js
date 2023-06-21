import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import API from "../api/authApi";

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/api/v1/users/register",
        values
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/api/v1/users/login",
        values
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/api/v1/users/logout"
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/login");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// get user profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        "/api/v1/users/profile"
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// update user prfile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ updatedUser, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        "/api/v1/users/profile/update",
        updatedUser
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// update user password
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        "http://localhost:4000/api/v1/users/profile/password/update",
        values
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// delete user prfile
export const deleteUserProfile = createAsyncThunk(
  "auth/deleteUserProfile",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        "http://localhost:4000/api/v1/users/profile/delete",
        { data: values }
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/register");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/api/v1/users/forgot/password",
        values
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/login");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ values,resetToken, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/api/v1/users/resetpassword/${resetToken}`,
        values
      );
      toast.success(response.data.message, {
        duration: 2000,
      });
      navigate("/login");
      return response.data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        duration: 2000,
      });
      return rejectWithValue(message);
    }
  }
);
