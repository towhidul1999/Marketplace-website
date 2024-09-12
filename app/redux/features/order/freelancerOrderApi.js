const { baseApi } = require("../../api/baseApi");

const freelancerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFreelancerAllOrder: builder.query({
        query: (status) => {
          const params = new URLSearchParams();
          if (status) {
            params.append("status", status);
          }
          return {
            url: "/orders/freelancer",
            method: "GET",
            params: params,
          };
        },
        transformResponse: (data) => data?.data?.attributes,
      }),
  }),
});

export const { useGetFreelancerAllOrderQuery } = freelancerOrderApi;
