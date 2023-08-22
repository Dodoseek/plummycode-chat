import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL
// Define a service using a base URL and expected endpoints

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: API_URL }), {
  maxRetries: 5,
})

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Users'],
  baseQuery: staggeredBaseQuery,
  endpoints:()=>({}),
})
