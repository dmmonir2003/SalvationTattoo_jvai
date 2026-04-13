import { baseApi } from "@/redux/store/baseApi";

// --- Types & Interfaces ---

export interface ProfileType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  role_display: string;
  is_active: boolean;
  profile_photo: string | null;
  member_since: string;
  last_login_at: string | null;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UpdatePhotoResponse {
  message: string;
  profile_photo: string;
}

// --- API Slice ---

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch current Profile profile info (image_7ae7cf.png)
    getProfile: builder.query<ProfileType, void>({
      query: () => ({
        url: "/admin/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // PATCH: Upload/Update profile picture (image_7aeed0.png)
    // Uses FormData for file upload
    updateProfilePhoto: builder.mutation<UpdatePhotoResponse, FormData>({
      query: (formData) => ({
        url: "/admin/profile/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // POST: Change Password (image_7aef2c.png)
    // Uses standard JSON
    changePassword: builder.mutation<
      { message: string },
      ChangePasswordRequest
    >({
      query: (credentials) => ({
        url: "/admin/profile/password/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfilePhotoMutation,
  useChangePasswordMutation,
} = profileApi;
