import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
   name: "user",
   initialState: {
      allSpecialty: [],
      allDoctor: [],
   },
   reducers: {
      getAllSpecialtiesSuccess: (state, action) => {
         state.allSpecialty = action.payload
      },
      getAllDoctorSuccess: (state, action) => {
         state.allDoctor = action.payload
      },
   },
})

export const userReducer = userSlice.reducer

export const { getAllSpecialtiesSuccess, getAllDoctorSuccess } = userSlice.actions

export default userReducer
