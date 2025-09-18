import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  url: string | null;
  loading: boolean;
  error: string | null;
} = {
  url: null,
  loading: false,
  error: null,
};

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_API
    : "/api";

export const fetchApiTryon = createAsyncThunk(
  "tryon/post",
  async (data: { formData: FormData; token: string }, { rejectWithValue }) => {
    console.log("FormData", data.formData);
    try {
      const response = await axios.post(
        `${baseUrl}/tryon/uploadCLothes`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("response: ",response.data);
      return response.data.data.url;
    } catch (error: any) {
      console.log("error", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const tryonSlice = createSlice({
  name: "tryon slice",
  initialState,
  reducers: {
    resetTryonState: (state) => {
      state.error = null;
      state.url = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTryon.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchApiTryon.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload as string;
      })
      .addCase(fetchApiTryon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTryonState } = tryonSlice.actions;
export default tryonSlice.reducer;
