import { fetchBaseQuery, retry, createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'


const API_URL = process.env.API_URL!
const MAX_RETRIES = parseInt(process.env.MAX_FETCH_RETRIES!)
// Define a service using a base URL and expected endpoints

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: API_URL }), {
  maxRetries: MAX_RETRIES,
})


export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: staggeredBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
})
