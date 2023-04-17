import { configureStore } from "@reduxjs/toolkit";
import { IAuthStore, IProductStore, authSlices, productSlice, categoriesSlice, ICategoryStore } from "./slices";


export interface Store {
  auth       : IAuthStore,
  products   : IProductStore
  categories : ICategoryStore
}

const store = configureStore<Store>({
  reducer: {
    auth: authSlices.reducer,
    products: productSlice.reducer,
    categories: categoriesSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;