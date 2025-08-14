import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    createNewProduct: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          url: "/products/create",
          method: "POST",
          body: formData,
        };
      },
    }),
    getSingleProductBySku: builder.query({
      query: (sku: string) => `/products/${sku}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductBySkuQuery , useCreateNewProductMutation} =
  productApi;
