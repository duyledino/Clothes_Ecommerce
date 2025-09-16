import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type detail = {
  productId: string;
  count: number;
  subTotal: number;
  size: string;
};

type OrderUserdetail = {
  productId: string;
  count: number;
  subtotal: number;
  size: string;
};

type orderCreate = {
  Message: string | null;
};

type user = {
  id: string;
  email: string;
  name: string;
};

type product = {
  title: string;
};
type detailAdmin = {
  size: string;
  count: number;
  product: product;
};

type OrderData = {
  id: string;
  user: user;
  total: number;
  update: Date;
  payment: string;
  status: string;
  details: detailAdmin[];
};

type userInOrderProfile = {
  id: string;
  email: string;
  address: string;
  name: string;
};

type OrdersUser = {
  id: string;
  user: userInOrderProfile;
  total: number;
  update: Date;
  payment: string;
  status: string;
  details: OrderUserdetail[];
};

const initialState: {
  orderId: string | null;
  errorOrder: string | null;
  loadingOrder: boolean;
  MessageOrder: string | null;
  Orders: OrderData[];
  totalPages: number | null;
  OrdersUser: OrdersUser[];
} = {
  errorOrder: null,
  loadingOrder: false,
  MessageOrder: null,
  orderId: null,
  Orders: [],
  totalPages: null,
  OrdersUser: [],
};

export const fetchApiAllOrder = createAsyncThunk(
  "fetchAllOrder/get",
  async (data: { token: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/allOrders?page=${data.page}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("resposne: ", response.data);
      return response.data.orders;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
export const fetchTotalOrderPage = createAsyncThunk(
  "fetchTotalPage/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/getTotalPage`
      );
      console.log("total page: ", response.data);
      return response.data.total;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

type paymentAndStatus = {
  // orderId
  id: string;
  //can be an empty string
  payment: string;
  //can be an empty string
  status: string;
};

export const fetchUpdateOrder = createAsyncThunk(
  "update an order",
  async (
    data: { order: paymentAndStatus; token: string },
    // get order id, payment state and order status
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/updateOrder?id=${data.order.id}`,
        {
          payment: data.order.payment,
          status: data.order.status,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
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

//NOTE: remember to add reducer to store !!!
export const fetchCreateOrder = createAsyncThunk(
  "create an order",
  // get user id and detail: detail
  async (
    data: { id: string; token: string; detail: detail[] },
    { rejectWithValue }
  ) => {
    console.log("detail: ", data.detail); // got this detail[]:
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/createAOrder`,
        { userId: data.id, details: data.detail },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          timeout: 5000,
        }
      );
      console.log("craete an order", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchGetOrdersById = createAsyncThunk(
  "getOrdersById/get",
  // get user id and detail: detail
  async (data: { id: string; token: string }, { rejectWithValue }) => {
    console.log("detail: ", data);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/order/getOrderById?id=${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          timeout: 5000,
        }
      );
      console.log("get order by id: ", response.data.orders);
      return response.data.orders;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetState: (state) => {
      console.log("refresh state. ✅");
      state.MessageOrder = null;
      state.errorOrder = null;
    },
  },
  extraReducers: (builder) => {
    //fetchCreateOrder
    builder.addCase(fetchCreateOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      console.log("✅ Payload received:", action.payload); // doesn't log
      state.orderId = action.payload.orderId as string;
      state.MessageOrder = action.payload.Message as string;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetchUpdateOrder
    builder.addCase(fetchUpdateOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchUpdateOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.MessageOrder = action.payload as string;
    });
    builder.addCase(fetchUpdateOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetchAllOrder
    builder.addCase(fetchApiAllOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchApiAllOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.Orders = action.payload;
    });
    builder.addCase(fetchApiAllOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetch total page
    builder.addCase(fetchTotalOrderPage.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchTotalOrderPage.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.totalPages = action.payload as number;
    });
    builder.addCase(fetchTotalOrderPage.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    builder.addCase(fetchGetOrdersById.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchGetOrdersById.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.OrdersUser = action.payload;
    });
    builder.addCase(fetchGetOrdersById.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
  },
});

export const { resetState } = orderSlice.actions;
export default orderSlice.reducer;
