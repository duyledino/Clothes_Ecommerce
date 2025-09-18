import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetState } from "./OrderSlice";

// Define the Review type
type Review = {
  productId: string;
  userId: string;
  score: number;
  content: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
};

// Define the initial state
type ReviewState = {
  Reviews: Review[];
  loadingReview: boolean;
  errorReview: string | null;
};

const initialState: ReviewState = {
  Reviews: [],
  loadingReview: false,
  errorReview: null,
};

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_API
    : "/api";

// Async thunk for fetching reviews by product ID
export const fetchReviewsByProductId = createAsyncThunk(
  "reviews/fetchByProductId",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/review/getReviewByProduct?productId=${productId}`
      );
      return response.data as Review[];
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to fetch reviews";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for creating a review
export const createReview = createAsyncThunk(
  "reviews/create",
  async (
    {
      productId,
      userId,
      score,
      token,
      content,
    }: {
      productId: string;
      userId: string;
      score: number;
      token: string;
      content: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/review/createAReviewByUser?userId=${userId}`,
        { productId, score, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data as Review;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to create review";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for updating a review
export const updateReview = createAsyncThunk(
  "reviews/update",
  async (
    {
      productId,
      userId,
      score,
      token,
      content,
    }: {
      productId: string;
      userId: string;
      score: number;
      token: string;
      content: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/review/updateAReviewByUser?productId=${productId}&userId=${userId}`,
        { score, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data as Review;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to update review";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for deleting a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (
    {
      productId,
      userId,
      token,
    }: { productId: string; userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `${baseUrl}/review/deleteAReviewByUser?productId=${productId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { productId, userId }; // Return the deleted review's ID for updating the state
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to delete review";
      return rejectWithValue(message);
    }
  }
);

// Create the review slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetStateReview: (state) => {
      state.errorReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(createReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(updateReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = state.Reviews.map((review) =>
          review.productId === action.payload.productId &&
          review.userId === action.payload.userId
            ? action.payload
            : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = state.Reviews.filter(
          (review) =>
            review.productId !== action.payload.productId ||
            review.userId !== action.payload.userId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      });
  },
});

export const { resetStateReview } = reviewSlice.actions;
export default reviewSlice.reducer;
