// getMyListApi.js
import { baseApi } from '../api/baseApi';

const getMyListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyList: builder.query({
            query: () => ({
                url: '/gig/love',
                method: 'GET',
            }),
            providesTags:['ReactLove']
        }),
    }),
});

export const { useGetMyListQuery } = getMyListApi;
