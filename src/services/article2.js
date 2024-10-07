import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY

export const articleApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", rapidApiKey)
            headers.set("X-RapidAPI-Host", "tldrthis.p.rapidapi.com")
            headers.set("Content-Type", "application/json")
            return headers
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.mutation({
            query: (params) => ({
                method: "POST",
                body: {
                    url: params.articleUrl,
                    min_length: 100,
                    max_length: 300,
                    is_detailed: false,
                },
            }),
        }),
    }),
})

export const { useGetSummaryMutation } = articleApi
