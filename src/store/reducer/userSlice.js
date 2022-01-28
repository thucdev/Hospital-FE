import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        allSpecialty: [],
    },
    reducers: {
        getAllSpecialtiesSuccess: (state, action) => {
            state.allSpecialty = action.payload
        },
    },
})

export const userReducer = userSlice.reducer

export const { getAllSpecialtiesSuccess } = userSlice.actions

export default userReducer
