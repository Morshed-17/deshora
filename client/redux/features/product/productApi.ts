import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProductBySku: builder.query({
      query: (sku: string) => `/products/${sku}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductBySkuQuery } =
  productApi;
