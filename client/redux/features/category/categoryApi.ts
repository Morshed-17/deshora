import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCategory: builder.query<any, string>({
      query: (slug) => `/categories/${slug}`,
      providesTags: ["Categories"],
    }),

    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          url: "/categories/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => {
        return {
          url: `/categories/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
