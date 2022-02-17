import { configureStore, combineReducers, applyMiddleware, compose } from "@reduxjs/toolkit"
import authReducer from "./reducer/authSlice"
import userReducer from "./reducer/userSlice"
import languageReducer from "./reducer/languageSlice"
import { persistStore, persistReducer } from "redux-persist"
import { createStore } from "redux"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import thunk from "redux-thunk"

const rootReducer = combineReducers({
   authReducer,
   languageReducer,
   userReducer,
})

const persistConfig = {
   key: "root",
   storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// store

export let store = createStore(persistedReducer, compose(applyMiddleware(thunk)))
export let persistor = persistStore(store)
