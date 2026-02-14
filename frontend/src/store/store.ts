import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import materialsReducer from "../features/materials/materialsSlice";
import { productsApi } from "../features/products/productsApi";
import { materialsApi } from "../features/materials/materialsApi";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    materials: materialsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      materialsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
