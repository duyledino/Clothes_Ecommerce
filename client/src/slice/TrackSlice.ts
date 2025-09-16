import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Revenue = {
  month: number;
  year: number;
  total: number;
};

type BestSeller = {
  id: string;
  price: number;
  count: number;
  title: string;
};

type BestCustomer = {
  id: string;
  name: string;
  email: string;
  total: number;
};

const initState = {
  loading: false,
  error: null as string | null,
  revenue: [] as Revenue[],
  bestSeller: [] as BestSeller[],
  bestCustomer: [] as BestCustomer[],
};

export const fetchRevenue = createAsyncThunk(
  "fetch revenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/track/revenue`
      );
      return response.data.revenue;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      rejectWithValue(message);
    }
  }
);
export const fetchBestSeller = createAsyncThunk(
  "fetch bestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/track/bestSeller`
      );
      return response.data.bestSeller;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      rejectWithValue(message);
      return rejectWithValue(error);
    }
  }
);

export const fetchBestCustomer = createAsyncThunk(
  "fetch bestCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/track/bestCustomer`
      );
      return response.data.bestCustomer;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
const trackSlice = createSlice({
  name: "track",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRevenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.revenue = action.payload;
    });
    builder.addCase(fetchRevenue.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(fetchBestSeller.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBestSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.bestSeller = action.payload;
    });
    builder.addCase(fetchBestSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(fetchBestCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBestCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.bestCustomer = action.payload;
    });
    builder.addCase(fetchBestCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
  },
});

export const {} = trackSlice.actions;

export default trackSlice.reducer;
