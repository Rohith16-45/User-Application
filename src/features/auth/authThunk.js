import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../services/authService";

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
