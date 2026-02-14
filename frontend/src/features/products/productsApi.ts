import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProductMaterial {
  id?: string;
  quantity: number;
  material: {
    id: string;
    name?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  materials: ProductMaterial[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: ["Product", "Materials"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product", "Materials"],
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Product", "Materials"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
