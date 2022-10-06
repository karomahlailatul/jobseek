import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postSignUpUser = createAsyncThunk("SignUpUser/postSignUpUser", async ({ param, dataUser }) => {
  const response = await axios
    .post(process.env.REACT_APP_API_BACKEND + param, JSON.stringify(dataUser), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      if (res.data.statusCode === 201) {
        toast.success(res.data.message, { toastId: "successSignUp" });
        return res.data
      } else {
        toast.warning(res.data.message, { toastId: "warningSignUp" });
        return res.data
      }
    })
    .catch((err) => {
      toast.warning(err.response.data.message, { toastId: "errorSignUp" });
      return err.response.data
    });
  return response;
});

const SignUpUserSlice = createSlice({
  name: "SignUpUser",
  initialState: {
    isLoading: false,
    isError: null,
    SignUpUser: [],
  },
  extraReducers: {
    [postSignUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [postSignUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.SignUpUser = action.payload;
    },
    [postSignUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default SignUpUserSlice.reducer;
