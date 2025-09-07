import { baseApi } from "@/redux/api/baseApi";

type TOrderPayload = {
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    product: string;
    size?: string;
    quantity: number;
  }[];
  deliveryAddress: string;
  deliveryZone: "inside-dhaka" | "outside-dhaka";
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, TOrderPayload>({
      query: (payload) => {
        return {
          url: "/orders",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {useCreateOrderMutation} = orderApi;
