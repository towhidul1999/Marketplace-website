import { baseApi } from "../api/baseApi";

const getAllUsers= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers:builder.query({
            query:(search)=>`/users?role=freelancer&fullName=${search || ""}`,
            providesTags:["Users"]
        })
    })
})

export const {useGetAllUsersQuery} = getAllUsers;