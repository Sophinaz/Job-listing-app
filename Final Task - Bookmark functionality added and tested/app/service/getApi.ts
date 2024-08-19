import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";
interface Type{
    data: string
    access: string | null
}


export const jobsApi = createApi({
    reducerPath: "Jobs",
    baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/"}),
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => "/opportunities/search"
        }),
        getSingleJob: builder.query({
            query: (id) => `/opportunities/${id}`
        }),       
        signUp: builder.mutation({
            query: (data) => ({
                url: `/signup`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
            })
        }), 
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: `/verify-email`,
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: data
            })
        }), 
        getBookmarks: builder.query({
            query: (data) => ({
                url: `/bookmarks`, 
                method: "GET", 
                headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${data}`}
            })
        }), 
        createBookmark: builder.mutation({
            query: ({ ids, token }) => (console.log("id:-", ids, "token:-", token),{
                url: `/bookmarks/${ids}`, 
                method: "POST", 
                headers: {'Authorization': `Bearer ${token}`},
            })
        }),
        deleteBookmark: builder.mutation({
            query: ({ id, token }) => ({
                url: `/bookmarks/${id}`,
                method: "DELETE",
                headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}`},
            })
        })
    })
})

export const { useGetAllJobsQuery, useGetSingleJobQuery, useSignUpMutation, useSignInMutation, useVerifyEmailMutation, useGetBookmarksQuery, useCreateBookmarkMutation, useDeleteBookmarkMutation } = jobsApi