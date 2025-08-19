import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"]
    }),
    createNewProduct: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          url: "/products/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
    getSingleProductBySku: builder.query({
      query: (sku: string) => `/products/${sku}`,
      providesTags: ["Products"],
    }),
    deleteAProduct: builder.mutation({
      query: (id: string) => {
        return { url: `/products/${id}`, method: "DELETE" };
      },
      invalidatesTags: ["Products"],
    }),
    editAProduct: builder.mutation<any, { sku: string; formData: FormData }>({
      query: ({ sku, formData }) => {
        return {
          url: `/products/edit/${sku}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductBySkuQuery,
  useCreateNewProductMutation,
  useDeleteAProductMutation,
  useEditAProductMutation,
} = productApi;
