import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.data.products.map(({ _id }: { _id: string }) => ({
                type: "Products" as const,
                id: _id,
              })),
            ]
          : [{ type: "Products", id: "LIST" }],
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
      invalidatesTags: (result, error, id) => [
        { type: "Products", id }, // invalidate the deleted product
        { type: "Products", id: "LIST" }, // invalidate the list to refetch
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductBySkuQuery,
  useCreateNewProductMutation,
  useDeleteAProductMutation,
} = productApi;
