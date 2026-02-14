import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Material {
  id: string;
  name: string;
  stock: number;
}

interface MaterialsState {
  items: Material[];
}

const initialState: MaterialsState = {
  items: [],
};

export const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    addMaterial: (state, action: PayloadAction<Material>) => {
      state.items.push(action.payload);
    },
    updateMaterial: (state, action: PayloadAction<Material>) => {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeMaterial: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addMaterial, updateMaterial, removeMaterial } =
  materialsSlice.actions;

export default materialsSlice.reducer;
