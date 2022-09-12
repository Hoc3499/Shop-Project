import axios from "axios";

export const productsThunk = async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/products");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
