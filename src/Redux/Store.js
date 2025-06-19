// src/Redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Components/Login/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
