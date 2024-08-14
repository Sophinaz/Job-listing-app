import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
    reducerPath: "Jobs",
    baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/"}),
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => "/opportunities/search"
        }),
        getSingleJob: builder.query({
            query: (id) => `/opportunities/${id}`
        })
    })
})

export const { useGetAllJobsQuery, useGetSingleJobQuery } = jobsApi