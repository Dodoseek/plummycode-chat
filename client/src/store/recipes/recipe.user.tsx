import { api } from "./api";


const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<AllUsers, void>({
          query: () => `users/account`,
        }),
        
        createUser: builder.mutation<User, CreateUser>({
          query: (user_data) => ({
            url: 'users/account/',
            method: 'POST',
            body: user_data
          }),
        }),

        getUserById: builder.query<User, number>({
          query: (id) => `users/account/${id}/`,
        }),

        updateUserById: builder.mutation<User, Pick<User, 'id'> & Partial<User> >({
          query: ({id, ...body}) => ({
            url:`users/account/${id}/`,
            method: "PATCH",
            body,
          }),
        }),

        deleteUserById: builder.mutation<User, Pick<User, 'id'>>({
          query: (id) => ({
            url:`users/account/${id}/`,
            method: "DELETE",
          }),
        }),

        activateUser: builder.mutation<ActivationData, ActivationData>({
          query: ({...body})=>({
            url: 'users/account/activation/',
            method: "POST",
            body
          }),
        }),

        getMyAccount: builder.query<User, void>({
          query: () => ({
            url:`users/account/me`
          }),
          extraOptions: { maxRetries: 0 },
        }),

        updateMyAccount: builder.mutation<User, Partial<User>>({
          query: ({...body}) => ({
            url:`users/account/me`,
            body
          }),
        }),

        deleteMyAccount: builder.mutation<User, void>({
          query: () => ({
            url:`users/account/me`,
          }),
        }),

        loginUser: builder.mutation<DataToken, AccesData>({
          query: ({...body}) => ({
            url: 'users/token/login/',
            method: 'POST',
            body: body,
            // credentials: "include",
          }),
        }),

        logoutUser: builder.mutation<DataToken, AccesData>({
          query: () => ({
            url: 'users/token/logout/',
            method: 'POST',
          }),

        }),

        logoutAllUser: builder.mutation<void, void>({
          query: () => ({
            url: 'users/token/logout-all/',
            method: 'POST',
          }),
        }),

      }),
})


export const {
  useDeleteMyAccountMutation,
  useGetMyAccountQuery,
  useUpdateMyAccountMutation,

  useActivateUserMutation,
  useLoginUserMutation,
  useLogoutAllUserMutation,
  useLogoutUserMutation,
  
  useGetUserByIdQuery, 
  useDeleteUserByIdMutation,
  
  useGetUsersQuery, 
  useCreateUserMutation,
  useUpdateUserByIdMutation,
} = userApi