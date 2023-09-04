import { CreateUser, User } from "@/types/users";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<User, CreateUser>({
      query: ({ ...data }) => ({
        url: `/users/account/register/`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { user: User }) => response.user,
    }),

    getMyAccount: builder.query<User, void>({
      query: () => ({
        url: `users/account/me`,
        credentials: "include",
      }),
      extraOptions: { maxRetries: 0 },
      transformResponse(baseQueryReturnValue: User) {
        return baseQueryReturnValue
      },
    }),

    // TODO on server
    updateMyAccount: builder.mutation<User, Partial<User>>({
      query: ({ ...body }) => ({
        url: `users/account/me`,
        body
      }),
    }),

    // TODO

    // deleteMyAccount: builder.mutation<User, void>({
    //   query: () => ({
    //     url: `users/account/me`,
    //   }),
    // }),

    // TODO
    // logoutAllUser: builder.mutation<void, void>({
    //   query: () => ({
    //     url: 'users/token/logout-all/',
    //     method: 'POST',
    //   }),
    // }),

  }),
})


export const {
  useGetMyAccountQuery,
  useLazyGetMyAccountQuery,
  useUpdateMyAccountMutation,

  useCreateUserMutation,
} = userApi