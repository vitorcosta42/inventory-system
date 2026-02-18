import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Material } from "./types";

export const materialsApi = createApi({
  reducerPath: "materialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Material"],
  endpoints: (builder) => ({
    getMaterials: builder.query<Material[], void>({
      query: () => "/materials",
      providesTags: ["Material"],
    }),

    addMaterial: builder.mutation<Material, Partial<Material>>({
      query: (material) => ({
        url: "/materials",
        method: "POST",
        body: material,
      }),
      invalidatesTags: ["Material"],
    }),

    updateMaterial: builder.mutation<
      Material,
      Partial<Material> & { id: string }
    >({
      query: ({ id, ...rest }) => ({
        url: `/materials/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Material"],
    }),

    deleteMaterial: builder.mutation<void, string>({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
