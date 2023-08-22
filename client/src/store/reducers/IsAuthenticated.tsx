import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialData: User = {
        id:  0,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        pictures: [],
        slug: '',
      }

export const AuthSlice = createSlice({
  name: 'IsAuth',
  initialState: initialData,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload
    },
    logOutUser: (state) => {
      state = initialData
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logOutUser } = AuthSlice.actions

export default AuthSlice.reducer