// src/components/LoginPage/LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  const { username, password } = credentials;

  // Simulated login logic
  if (username === "Shivakumar" && password === "123") {
    const userData = {
      user: { name: "Shivakumar", role: "Doctor" },
      token: "mock-token",
    };

    // Optionally persist in localStorage
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);

    return userData;
  } else {
    return thunkAPI.rejectWithValue("Invalid credentials");
  }
});

// Load initial state from localStorage
const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  status: "idle",
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
