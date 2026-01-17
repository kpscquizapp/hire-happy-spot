import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../services/service";
import { getAuthHeaders } from "@/lib/helpers";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        headers: getAuthHeaders(),
        method: "GET",
        url: "jobboard/profile",
      }),
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        headers: getAuthHeaders(),
        method: "PUT",
        url: "jobboard/profile",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
