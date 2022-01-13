import { createSlice } from '@reduxjs/toolkit'

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
}

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        languageState: {
            started: true,
            language: 'vi',
            systemMenuPath: '/system/user-manage',
            contentOfConfirmModal: {
                ...initContentOfConfirmModal,
            },
        },
    },
    reducers: {
        changLanguageApp: (state, action) => {
            state.language = action.payload
        },
    },
})

export const languageReducer = languageSlice.reducer

export const languageSelector = (state) => state.languageReducer.languageState

export const { changLanguageApp } = languageSlice.actions

export default languageReducer
