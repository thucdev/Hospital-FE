import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authSlice'
import languageReducer from './reducer/languageSlice'

// store
const store = configureStore({
    reducer: {
        authReducer,
        languageReducer,
    },
    devTools: true,
})

export default store
