import CartIem from "@/components/guest/CartIem";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type Product = {
  id: string;
  price: number;
  imageUrl: string[];
  title: string;
  size: string;
};
type cartItem = {
  size: string;
  count: number;
  subtotal: number;
  product: Product;
  active: boolean;
};

const initialState: {
  loading: boolean;
  error: string | null;
  Message: string | null;
  carts: cartItem[];
} = {
  carts: [],
  loading: false,
  error: null,
  Message: null,
};

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_API
    : "";

export const fetchApiCart = createAsyncThunk(
  "get cart",
  //user id get from
  async (data: { id: string; token: string }, { rejectWithValue }) => {
    try {
      console.log("id in slice: ", data.id);
      const response = await axios.get(
        `${baseUrl}/cart/getCart?id=${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          timeout: 5000, // 5s
        }
      );
      // console.log("respone: ",response.data.carts);
      return response.data.carts;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

//     cartItem:  {
// productId String
// count     Int     @default(0)
// subtotal  BigInt  @default(0)
//     }

export const fetchApiAddToCart = createAsyncThunk(
  "add to cart",
  //NOTE: get cartItem and user id
  async (
    data: { cartItem: cartItem; id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("cartItem: ", data.cartItem);
      const response = await axios.post(
        `${baseUrl}/cart/addToCart?id=${data.id}`,
        { cartItem: data.cartItem },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          timeout: 5000, // 5s
        }
      );
      return response.data.Message;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchApiDeleteACart = createAsyncThunk(
  "delete an item in cart",
  // get product id
  async (
    data: { productId: string; userId: string; size: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/cart/removeOneItemCart?userId=${data.userId}&productId=${data.productId}&size=${data.size}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data.Message;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const CartSlice = createSlice({
  name: "cart slice",
  initialState,
  reducers: {
    refeshAddToCart: (state) => {
      state.error = null;
      state.Message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchApiCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApiAddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload in cartSlice: ", action.payload);
        state.Message = action.payload as string;
      })
      .addCase(fetchApiAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApiDeleteACart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiDeleteACart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload in cartSlice: ", action.payload);
        state.Message = action.payload as string;
      })
      .addCase(fetchApiDeleteACart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { refeshAddToCart } = CartSlice.actions;
export default CartSlice.reducer;
