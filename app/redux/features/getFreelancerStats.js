const { baseApi } = require("../api/baseApi");

const getFreelancerStats = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFreelancerStats: builder.query({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      transformResponse: (data) => data?.data?.attributes,
    }),
  }),
});

export const {useGetFreelancerStatsQuery} = getFreelancerStats
