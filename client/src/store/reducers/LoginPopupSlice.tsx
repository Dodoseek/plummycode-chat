import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Popup {
  condition: boolean
}

const initialState: Popup = {
  condition: false,
}

export const LoginPopupSlice = createSlice({
  name: 'LoginPopup',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.condition = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsOpen } = LoginPopupSlice.actions

export default LoginPopupSlice.reducer