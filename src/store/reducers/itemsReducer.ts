import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  fetchItemsByCategoryIdThunk,
  fetchItemsThunk,
} from "../middlewares/items";
import { IItem } from "../../@types/order";

interface RootState {
  list: IItem[];
}

export const initialState: RootState = {
  list: [],
};

const itemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchItemsThunk.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log("fulfilled");
    })
    .addCase(fetchItemsThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      // console.log("rejected");
    })
    .addCase(fetchItemsByCategoryIdThunk.fulfilled, (state, action) => {
      state.list = action.payload;
      // console.log("fulfilled");
    })
    .addCase(fetchItemsByCategoryIdThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      // console.log("rejected");
    });
});

export default itemsReducer;
