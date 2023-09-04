import { api } from "./api";
import { FriendRequest } from "@/types/friends";

export const friendsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRequest: builder.mutation<FriendRequest, { user: number, access_token: string }>({
            query: (data) => ({
                url: `/friendlist/request/`,
                method: 'POST',
                body: {
                    user: data.user
                },
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            }),
            extraOptions: { maxRetries: 0 },
        }),
    }),
})


export const {
    useCreateRequestMutation,
} = friendsApi