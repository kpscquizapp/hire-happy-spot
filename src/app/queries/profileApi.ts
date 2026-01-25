import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../services/service";
import { getAuthHeaders } from "@/lib/helpers";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    prepareHeaders: (headers) => {
      const { Authorization } = getAuthHeaders();
      if (Authorization) {
        headers.set("Authorization", Authorization);
      }
      return headers;
    },
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
    viewResume: builder.query<string, { resumeId: number }>({
      query: ({ resumeId }) => ({
        url: `/jobboard/profile/resume/${resumeId}?view=inline`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          // Convert blob to URL immediately - returns serializable string
          return URL.createObjectURL(blob);
        },
      }),
      keepUnusedDataFor: 0, // Don't cache - immediately remove from store
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: "jobboard/profile/resume",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
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
    removeSkill: builder.mutation<void, number>({
      query: (skillId) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/skills/${skillId}`,
      }),
      async onQueryStarted(skillId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          profileApi.util.updateQueryData("getProfile", undefined, (draft) => {
            if (!draft?.candidateProfile?.skills) return;
            draft.candidateProfile.skills =
              draft.candidateProfile.skills.filter(
                (s: any) => String(s.id) !== String(skillId),
              );
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Profile"],
    }),
    removeWorkExperience: builder.mutation<void, number>({
      query: (workExperienceId) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/work-experience/${workExperienceId}`,
      }),
      invalidatesTags: ["Profile"],
    }),
    removeProject: builder.mutation<void, number>({
      query: (projectId) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/projects/${projectId}`,
      }),
      invalidatesTags: ["Profile"],
    }),
    removeCertificate: builder.mutation<void, number>({
      query: (certificateId) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/certifications/${certificateId}`,
      }),
      invalidatesTags: ["Profile"],
    }),
    removeResume: builder.mutation<void, number>({
      query: (resumeId) => ({
        headers: getAuthHeaders(),
        method: "DELETE",
        url: `jobboard/profile/resume/${resumeId}`,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyViewResumeQuery,
  useUploadResumeMutation,
  useUpdateProfileMutation,
  useRemoveResumeMutation,
  useRemoveSkillMutation,
  useRemoveWorkExperienceMutation,
  useRemoveProjectMutation,
  useRemoveCertificateMutation,
} = profileApi;
