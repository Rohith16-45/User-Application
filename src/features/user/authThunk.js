import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../../services/userService";
import { getAllUsers } from "../../services/userService";

export const registerThunk = createAsyncThunk(
  "/register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await register(body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to register"
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await login(body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to login"
      );
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  "auth/getAllUsers",
  async ({ pageNumber, pageSize }, { rejectWithValue }) => {
    try {
      const response = await getAllUsers(pageNumber, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch users"
      );
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await getUser(body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to get user"
      );
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to update user"
      );
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to delete user"
      );
    }
  }
);
