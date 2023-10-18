import { createAction, createReducer } from "@reduxjs/toolkit";
import { fetchTablesThunk } from "../middlewares/tables";
import { ITable } from "../../@types/order";

interface RootState {
  list: ITable[];
}

export const initialState: RootState = {
  list: [],
};
export const updateTablesAction = createAction<ITable>("tables/UPDATE_LIST");
const tablesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTablesThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addCase(fetchTablesThunk.rejected, () => {
      // puisqu'on la requette à planté on précise qu'on peut enlever le loader
      // console.log("rejected");
    })
    .addCase(updateTablesAction, (state, action) => {
      const updatedTable = action.payload;
      if (!updatedTable) {
        console.error("Invalid order:", updatedTable);
        return;
      }
      state.list = state.list.map((table) => {
        if (table.id !== updatedTable.id) {
          return table;
        }
        return updatedTable;
      });
    });
});
export default tablesReducer;
