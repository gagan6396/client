import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Create slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action for starting registration
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Action for successful registration
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    // Action for failed registration
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Action for starting login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Action for successful login
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    // Action for failed login
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

// Export actions
export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
