import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { StaticImageData } from "next/image";
import { toast } from "react-toastify";
import { resetState } from "./OrderSlice";

type ProductLanding = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string[];
};
type ProductData = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string[];
  tryon: string;
  category: string;
  subcategory: string;
  size: string[];
};
type ProductDataAmin = {
  id: string;
  title: string;
  price: number;
  imageUrl: string[];
  size: string[];
  category: string;
  count: number;
  isDelete: string;
};
const initialState: {
  Products: ProductData[];
  loading: boolean;
  error: string | null;
  Message: string | null;
  Product: ProductData | null;
  totalPage: number;
  SearchProduct: ProductData[];
  ProductsAdmin: ProductDataAmin[];
  BestSellerProduct: ProductLanding[];
  LatestProduct: ProductLanding[];
} = {
  BestSellerProduct: [],
  LatestProduct: [],
  ProductsAdmin: [],
  SearchProduct: [],
  Products: [],
  loading: false,
  error: null,
  Message: null,
  Product: null,
  totalPage: 0,
};

export const fetchBestSellerProductFromApi = createAsyncThunk(
  "get/getBestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/bestSellerProducts`
      );
      console.log("resposne.data in fetchBestSellerFromApi: ", response.data);
      return response.data.products;
    } catch (error: any) {
      console.error("error in bestSeller slice:");
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchLatestFromApi = createAsyncThunk(
  "get/getLatestProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/lastestProducts`
      );
      console.log("resposne.data in lastestProducts: ", response.data);
      return response.data.products;
    } catch (error: any) {
      console.error("error in lastestProducts slice:");
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchProductFromApi = createAsyncThunk(
  "fetchProduct",
  async (
    data: {
      page: number;
      category: string[];
      subcategory: string[];
      sort: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "data.page: ",
        data.page,
        data.category,
        data.subcategory,
        data.sort
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/allProducts?page=${data.page}`,
        {
          category: data.category,
          subcategory: data.subcategory,
          sort: data.sort,
        }
      );
      return response.data.products;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchProductFromApiAdmin = createAsyncThunk(
  "fetchProduct/Admin",
  async (
    data: {
      page: number;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("data.page: ", data.page);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/allProductsAdmin?page=${data.page}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.products;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateAProduct = createAsyncThunk(
  "product/createAProduct",
  async (
    formData: {
      token: string;
      productCreate:
        | FormData
        | {
            images: StaticImageData[];
            title: string;
            description: string;
            price: number;
          };
    },
    { rejectWithValue }
  ) => {
    console.log("formData.productCreate: ", formData.productCreate);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/createAProduct`,
        formData.productCreate,
        {
          headers: {
            Authorization: `Bearer ${formData.token}`,
          },
        }
      );
      return response.data.Message;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchGetProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/getProductById?id=${id}`
      );
      console.log(response.data);
      return response.data.product;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchTotalPage = createAsyncThunk(
  "product/getTotalPage",
  async (
    data: { categories: string[]; subcategory: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/getTotalPage`,
        { category: data.categories, subcategory: data.subcategory }
      );
      console.log("response.data total page: ", response.data);
      return response.data.total;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchApiSearchProduct = createAsyncThunk(
  "product/findProduct",
  async (data: { query: string }, { rejectWithValue }) => {
    try {
      console.log("query: ", data.query);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/findProduct?query=${data.query}`
      );
      console.log("response.data.result: ", response.data);
      return response.data.result;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
export const fetchDeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (data: { ids: string[]; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/deleteProduct`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          data: { ids: data.ids },
        }
      );
      console.log("delete product: ", response.data);
      return response.data.Message;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchReviseProduct = createAsyncThunk(
  "product/reviseProduct",
  async (data: { ids: string[]; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/reviseProduct`,
        { ids: data.ids },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log("revise product: ", response.data);
      return response.data.Message;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    resetStateProduct: (state) => {
      console.log("refresh state. ✅");
      state.Message = null;
      state.error = null;
    },
    resetSearchProduct: (state) => {
      console.log("refresh state. ✅");
      state.SearchProduct = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.Products = action.payload;
      })
      .addCase(fetchProductFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCreateAProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateAProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchCreateAProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGetProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.Product = action.payload as ProductData;
      })
      .addCase(fetchGetProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalPage.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPage = action.payload as number;
      })
      .addCase(fetchTotalPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApiSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchProduct = action.payload;
      })
      .addCase(fetchApiSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductFromApiAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFromApiAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductsAdmin = action.payload;
      })
      .addCase(fetchProductFromApiAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBestSellerProductFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellerProductFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.BestSellerProduct = action.payload as ProductLanding[];
      })
      .addCase(fetchBestSellerProductFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLatestFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.LatestProduct = action.payload as ProductLanding[];
      })
      .addCase(fetchLatestFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReviseProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviseProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchReviseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStateProduct, resetSearchProduct } = productSlice.actions;
export default productSlice.reducer;
