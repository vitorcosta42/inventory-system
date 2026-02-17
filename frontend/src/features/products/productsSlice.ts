import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductMaterial {
  materialId: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  materials: ProductMaterial[];
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },

    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    clearProducts(state) {
      state.items = [];
    },
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  setProducts,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
