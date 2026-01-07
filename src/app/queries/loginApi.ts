import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../services/service";
import { getAuthHeaders } from "../../lib/helpers";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
        url: "auth/login", // sample api
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
    }),
     getRefreshToken: builder.mutation({
      query: (data) => ({
        headers: getAuthHeaders(),
        method: "POST",
        url: `auth/refresh`,// sample api
        body: data,
      }),
    }),
     logout: builder.mutation({
      query: () => ({
        headers: getAuthHeaders(),
        method: "POST",
        url: `auth/logout`,// sample api
       
      }),
    }),
  }),
  
});

export const {
  useLoginUserMutation,
  useGetRefreshTokenMutation,
  useLogoutMutation,
} = loginApi;