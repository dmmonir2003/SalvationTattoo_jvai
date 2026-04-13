import { baseApi } from "@/redux/store/baseApi";

// --- Types & Interfaces ---

export interface SplashScreen {
  id: number;
  image_url: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

interface FAQListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FAQ[];
}

interface FAQQueryParams {
  page?: number;
}

interface CreateFAQRequest {
  question: string;
  answer: string;
}

// --- API Slice ---

export const appContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Splash Screen Endpoints ---

    // GET: Fetch splash screen (image_7a606b.png)
    // getSplashScreen: builder.query<SplashScreen, void>({
    //   query: () => ({
    //     url: "/admin/app-content/splash-screen/",
    //     method: "GET",
    //   }),
    //   providesTags: ["AppContent"],
    // }),

    getSplashScreen: builder.query<SplashScreen, void>({
      query: () => ({
        url: "/admin/app-content/splash-screen/",
        method: "GET",
        // This triggers the skip logic in baseApi
        headers: {
          "no-auth": "true",
        },
      }),
      providesTags: ["AppContent"],
    }),

    // POST: Update/Add Splash Screen (image_7a606b.png uses form-data)
    updateSplashScreen: builder.mutation<SplashScreen, FormData>({
      query: (formData) => ({
        url: "/admin/app-content/splash-screen/",
        method: "POST", // Note: Your image shows a GET with body, but standard creation is POST/PUT.
        body: formData, // Based on image_7a606b, it uses form-data for the 'image' file
      }),
      invalidatesTags: ["AppContent"],
    }),

    // --- FAQ Endpoints ---

    // GET: List FAQs with pagination (image_7a63f1.png)
    getFAQs: builder.query<FAQListResponse, FAQQueryParams>({
      query: (params) => ({
        url: "/admin/app-content/faqs/",
        method: "GET",
        params: {
          page: params.page || 1,
        },
      }),
      providesTags: ["FAQs"],
    }),

    // POST: Create FAQ (image_7a60c7.png)
    createFAQ: builder.mutation<
      { message: string; faq: FAQ },
      CreateFAQRequest
    >({
      query: (newFaq) => ({
        url: "/admin/app-content/faqs/",
        method: "POST",
        body: newFaq, // JSON format
      }),
      invalidatesTags: ["FAQs"],
    }),

    // PATCH: Edit FAQ (image_7a6447.png)
    updateFAQ: builder.mutation<
      { message: string; faq: FAQ },
      { id: number; data: Partial<CreateFAQRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/app-content/faqs/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FAQs"],
    }),

    // DELETE: Remove FAQ (image_7a64c9.png)
    deleteFAQ: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/app-content/faqs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQs"],
    }),
  }),
});

export const {
  useGetSplashScreenQuery,
  useUpdateSplashScreenMutation,
  useGetFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = appContentApi;
