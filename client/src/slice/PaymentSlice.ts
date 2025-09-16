import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  paymentLoading: boolean;
  PaymentURL: string|null;
  paymentError: string | null;
} = {
  PaymentURL: null,
  paymentError: null,
  paymentLoading: false,
};

export const fetchApiPaymentURL = createAsyncThunk(
  "payment URL",
  async (
    data: { id: string; token: string; total: number },
    { rejectWithValue }
  ) => {
    {
      console.log("id, total in slice: ", data.id);
      //get userid, token, totalCart (number)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/payment/createPayment`,
          { id: data.id, total: data.total },
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );
        console.log("PaymentURL: ",response.data);
        return response.data.PaymentURL;
      } catch (error: any) {
        console.error(error);
        const message = error.response?.data?.Message || "Something went wrong";
        return rejectWithValue(error);
      }
    }
  }
);

const PaymentSice = createSlice({
  name: "payment slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiPaymentURL.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(fetchApiPaymentURL.fulfilled, (state, action) => {
        state.PaymentURL = action.payload as string;
        state.paymentLoading = false;
      })
      .addCase(fetchApiPaymentURL.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      });
  },
});

export const {} = PaymentSice.actions;
export default PaymentSice.reducer;
