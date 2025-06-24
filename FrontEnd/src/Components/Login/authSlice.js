// src/components/LoginPage/LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ⏳ Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  const { username, password } = credentials;

  if (username === "Shivakumar" && password === "123") {
    const userData = {
      user: { name: "Shivakumar", role: "Doctor" },
      token: "mock-token",
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);

    return userData;
  } else {
    return thunkAPI.rejectWithValue("Invalid credentials");
  }
});

// ✅ Sync Redux state from localStorage (for browser back edge case)
export const syncAuthFromStorage = createAsyncThunk("auth/sync", async (_, thunkAPI) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (user && token) {
    return {
      user: JSON.parse(user),
      token,
    };
  } else {
    return thunkAPI.rejectWithValue("No auth data in storage");
  }
});

// 🏁 Load initial state
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
      // Login
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
      })

      // Sync from localStorage
      .addCase(syncAuthFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(syncAuthFromStorage.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
