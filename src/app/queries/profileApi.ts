import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../services/service";
import { getAuthHeaders } from "@/lib/helpers";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: (data) => ({
        headers: getAuthHeaders(),
        method: "GET",
        url: "jobboard/profile",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        headers: getAuthHeaders(),
        method: "PUT",
        url: "jobboard/profile",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    removeSkill: builder.mutation({
      query: (data) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/skills/${data}`,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRemoveSkillMutation,
} = profileApi;
