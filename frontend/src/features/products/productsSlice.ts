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
    // ➕ Criar
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },

    // ✏ Atualizar
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // ❌ Remover
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    // 🔄 Substituir todos (útil para API futuramente)
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    // 🧹 Resetar estado (opcional)
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
