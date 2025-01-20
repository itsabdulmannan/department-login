import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpenSideBar : true
}

export const toggleSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    isSideBarOpen: (state) => {
      state.isOpenSideBar = true
    },
    isSideBarClose: (state) => {
      state.isOpenSideBar = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { isSideBarOpen, isSideBarClose } = toggleSlice.actions

export default toggleSlice.reducer