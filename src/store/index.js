import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authSlice'
import userReducer from './reducer/userSlice'
import languageReducer from './reducer/languageSlice'

// store
const store = configureStore({
    reducer: {
        authReducer,
        languageReducer,
        userReducer,
    },
    devTools: true,
})

export default store
