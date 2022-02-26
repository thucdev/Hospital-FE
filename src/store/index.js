import { applyMiddleware, combineReducers, compose } from "@reduxjs/toolkit"
import { createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import thunk from "redux-thunk"
import authReducer from "./reducer/authSlice"
import languageReducer from "./reducer/languageSlice"
import userReducer from "./reducer/userSlice"

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
