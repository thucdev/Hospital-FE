import { createSlice } from '@reduxjs/toolkit'

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
}
// "@formatjs/intl-pluralrules": "^4.3.0",
// "@formatjs/intl-relativetimeformat": "^9.5.1",
const languageSlice = createSlice({
    name: 'language',
    initialState: {
        languageState: {
            language: 'vi',
            // started: true,
            // systemMenuPath: '/system/user-manage',
            // contentOfConfirmModal: {
            //     ...initContentOfConfirmModal,
            // },
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
