import axios from "axios";

export const productThunk = async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
