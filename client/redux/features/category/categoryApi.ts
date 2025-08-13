import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
