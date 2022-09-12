import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);

export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);

export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")),
    isLogIn: localStorage.getItem("user") ? true : false,
    isVisible: false,
  },
  reducers: {
    setIsLogIn: (state, { payload }) => {
      state.isLogIn = payload;
    },
    setIsVisible: (state) => {
      state.isVisible = !state.isVisible;
    },
    logOutUser: (state) => {
      removeUserFromLocalStorage("user");
      state.isLogIn = false;
      state.isVisible = false;
      state.user = null;
      toast.error("User logged out...");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success("User Register Successful ...");
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [loginUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success(`Welcome back ${payload.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success(`User Updated`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
     toast.error(payload);
    },
  },
});

export const { setIsLogIn, setIsVisible, logOutUser } = userSlice.actions;

export default userSlice.reducer;
