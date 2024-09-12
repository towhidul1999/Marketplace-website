const { baseApi } = require("../../api/baseApi");

const buyerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBuyerOrder: builder.mutation({
      query: (order) => ({
        url: "/orders/checkout",
        method: "POST",
        body: order,
      }),
    }),
    getBuyerAllOrder: builder.query({
      query: (status) => {
        const params = new URLSearchParams();
        if (status) {
          params.append("status", status);
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (data) => data?.data?.attributes,
      providesTags: ["Orders"],
    }),
    getBuyerOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      transformResponse: (data) => data?.data?.attributes,
      providesTags: ["Orders"],
    }),
    updateBuyerOrderStatus: builder.mutation({
      query: ({orderId, status}) => ({
        url: `/orders?orderId=${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateBuyerOrderMutation,
  useGetBuyerAllOrderQuery,
  useGetBuyerOrderDetailsQuery,
  useUpdateBuyerOrderStatusMutation,
} = buyerOrderApi;
