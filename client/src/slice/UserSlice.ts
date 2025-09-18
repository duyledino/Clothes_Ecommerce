import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tr } from "zod/v4/locales";

type userData = {
  Message: string;
  token: string;
  email: string;
  admin: boolean;
  id: string;
};

type user = {
  id: string;
  email: string;
  name: string;
  address: string;
};

const initialState: {
  loadingUser: boolean;
  data: userData | null;
  errorUser: string | null;
  Message: string | null;
  User: user | null;
} = {
  loadingUser: false,
  data: null,
  errorUser: null,
  Message: null,
  User: null,
};

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_API
    : "/api";

export const fetchLogin = createAsyncThunk(
  "login User",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "sign up user",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/createAUser`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "updateUser/put",
  async (
    data: {
      token: string;
      id: string;
      password: string;
      adderss: string;
      name: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/user/updateUser`,
        {
          id: data.id,
          name: data.name,
          address: data.adderss,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.Message;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "fetchUserById/get",
  async (data: { token: string; id: string }, { rejectWithValue }) => {
    try {
      console.log(
        "process.env.NEXT_PUBLIC_NODE_ENV: ",
        process.env.NEXT_PUBLIC_NODE_ENV
      );
      const response = await axios.get(
        `${baseUrl}/user/getAUser?id=${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("response.data in userSlice: ", response.data.user);
      return response.data.user;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user Slice",
  initialState,
  reducers: {
    resetUserState: (state) => {
      (state.errorUser = null), (state.Message = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loadingUser = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loadingUser = false;
      if (action.payload == undefined) state.data = null;
      else state.data = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loadingUser = false;
      state.errorUser = action.payload as string;
    });
    builder
      .addCase(fetchSignup.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.loadingUser = false;
        if (action.payload == undefined) state.data = null;
        else state.data = action.payload;
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
    builder
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.User = action.payload as user;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
