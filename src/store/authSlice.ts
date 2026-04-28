import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state: AuthState) {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout(state: AuthState) {
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

