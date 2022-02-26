import { createSlice } from "@reduxjs/toolkit"

const languageSlice = createSlice({
   name: "language",
   initialState: {
      languageState: {
         language: "vi",
      },
   },
   reducers: {
      changLanguageApp: (state, action) => {
         state.languageState.language = action.payload
      },
   },
})

export const languageReducer = languageSlice.reducer

export const { changLanguageApp } = languageSlice.actions

export default languageReducer
