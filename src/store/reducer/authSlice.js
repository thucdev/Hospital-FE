import { createSlice } from '@reduxjs/toolkit'

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
        loginFailed: (state) => {
            state.login.authLoading = false
            state.login.isAuthenticated = false
            // state.login.user = action.payload
        },
        registerSuccess: (state) => {
            state.register.authLoading = false
            state.login.authLoading = false
        },
    },
})

// reducer
const authReducer = authSlice.reducer

// export action
export const { loginSuccess, registerSuccess, loginFailed } = authSlice.actions

export default authReducer

// Selector : la noi store xuat khau ra data  de component nhan du lieu do
// export const authSelector = (state) => state.authReducer.initialState
// export const authSelector = (state) => state.authReducer.login
