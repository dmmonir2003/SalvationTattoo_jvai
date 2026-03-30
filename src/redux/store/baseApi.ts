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
      // Pull token from auth slice
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});

// Export utility functions
export const { util: apiUtil } = baseApi;

// Export the api for injection
export { baseApi as api };
