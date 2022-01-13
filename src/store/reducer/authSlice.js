import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { loginAsync } from '../apiRequest/apiAuth'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            authLoading: true,
            isAuthenticated: false,
            user: null,
        },
        register: {
            authLoading: true,
            isAuthenticated: false,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.authLoading = false
            state.login.isAuthenticated = true
            state.login.user = action.payload
        },
        registerSuccess: (state) => {
            state.login.authLoading = false
        },
    },
})

// export const loginAsync = (user) => {
//     const getLoginAsync = async (dispatch) => {
//         try {
//             const res = await axios.post(`http://localhost:8080/v1/login`, user)
//             dispatch(loginSuccess(res.data))
//             console.log('res', res)
//         } catch (error) {
//             console.log('', error)
//         }
//     }
//     return getLoginAsync
// }

// reducer
const authReducer = authSlice.reducer

// Selector : la noi store xuat khau ra data  de component nhan du lieu do
export const authSelector = (state) => state.authReducer.initialState

// export action
export const { loginSuccess, registerSuccess } = authSlice.actions

export default authReducer
