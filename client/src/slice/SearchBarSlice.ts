import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const slice = createSlice({
  initialState,
  name: "searchBar",
  reducers: {
    setShow(state,action: PayloadAction<boolean>){
        state.show = action.payload;
        return state;
    }
  }
});

export const {setShow} = slice.actions;
export default slice.reducer;