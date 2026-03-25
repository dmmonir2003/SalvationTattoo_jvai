import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from ".";

// Base URL for API - configurable via environment variable
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Create the base API with RTK Query
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state
      const token = (getState() as RootState).auth.token;

      // If we have a token, add it to the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Set default headers
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Task",
    "Location",
    "Attendance",
    "Report",
    "Notification",
    "Performance",
  ],
  endpoints: () => ({}),
});

// Export utility functions
export const { util: apiUtil } = baseApi;

// Export the api for injection
export { baseApi as api };
