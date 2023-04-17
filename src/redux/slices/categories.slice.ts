import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../models/category.model";

export interface ICategoryStore {
  data: ICategory[]
};

const initialState: ICategoryStore = {
  data: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (_, action: PayloadAction<ICategory[]>) => {
      return {
        data: action.payload,
        count: action.payload.length
      }
    }
  },
});


export const {setCategories} = categoriesSlice.actions;