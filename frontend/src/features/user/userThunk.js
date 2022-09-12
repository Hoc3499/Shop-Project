import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const res = await axios.post("/api/users", user);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const res = await axios.post("/api/users/login", user);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const res = await axios.put("/api/users/profile", user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response.status === 500) {
      toast.error("Email already exists");
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
