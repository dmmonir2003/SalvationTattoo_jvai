import { baseApi } from "@/redux/store/baseApi";
import type { User, ApiResponse } from "@/types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<ApiResponse<LoginResponse>, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    // Verify OTP
    verifyOTP: builder.mutation<
      ApiResponse<{ verified: boolean }>,
      VerifyOTPRequest
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // Update profile
    updateProfile: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Logout (invalidate tokens)
    logout: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
