import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { da } from "zod/v4/locales";

type User = {
  id: string;
  name: string;
  email: string;
};

type Chat = {
  chatId: string;
  toUser: User;
  fromUser: User;
};

type Message = {
  messageId: string;
  chatId: string;
  userId: string;
  content: string;
};

type ChatState = {
  loadingChat: boolean;
  chats: Chat[] | null;
  errorChat: string | null;
  messages: Message[] | null;
};

const initialState: ChatState = {
  loadingChat: false,
  chats: null,
  errorChat: null,
  messages: null,
};

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_API
    : "";

export const fetchChatsByUserId = createAsyncThunk(
  "chat/fetchChatsByUserId",
  async (data: { userId: string; token: string }, { rejectWithValue }) => {
    try {
      console.log("chat/fetchChatsByUserId: ", data);
      const response = await axios.get(
        `${baseUrl}/chat/getChatByUserId?userId=${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("response.data.chats: ", response.data);
      return response.data.chats;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (data: { userId: string; token: string }, { rejectWithValue }) => {
    try {
      console.log("chat/createChat", data);
      const response = await axios.post(
        `${baseUrl}/chat/createChat?userId=${data.userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (
    data: { chatId: string; userId: string; content: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/chat/createMessage?chatId=${data.chatId}&userId=${data.userId}`,
        { content: data.content }, // Access content from data parameter
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const getAllMessageFromChat = createAsyncThunk(
  "message/getMessages",
  async (data: { chatId: string; token: string }, { rejectWithValue }) => {
    console.log("chatId, token: ", data.chatId, data.token);
    try {
      const response = await axios.get(
        `${baseUrl}/chat/getMessage?chatId=${data.chatId}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("response message: ", response.data);
      return response.data.messages as Message[];
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsByUserId.pending, (state) => {
        state.loadingChat = true;
        state.errorChat = null;
      })
      .addCase(fetchChatsByUserId.fulfilled, (state, action) => {
        state.loadingChat = false;
        state.chats = action.payload;
      })
      .addCase(fetchChatsByUserId.rejected, (state, action) => {
        state.loadingChat = false;
        state.errorChat = action.payload as string;
      })
      .addCase(createChat.pending, (state) => {
        state.loadingChat = true;
        state.errorChat = null;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.loadingChat = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loadingChat = false;
        state.errorChat = action.payload as string;
      })
      .addCase(createMessage.pending, (state) => {
        state.loadingChat = true;
        state.errorChat = null;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.loadingChat = false;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loadingChat = false;
        state.errorChat = action.payload as string;
      })
      .addCase(getAllMessageFromChat.pending, (state) => {
        state.loadingChat = true;
        state.errorChat = null;
      })
      .addCase(getAllMessageFromChat.fulfilled, (state, action) => {
        state.loadingChat = false;
        state.messages = action.payload;
      })
      .addCase(getAllMessageFromChat.rejected, (state, action) => {
        state.loadingChat = false;
        state.errorChat = action.payload as string;
      });
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
