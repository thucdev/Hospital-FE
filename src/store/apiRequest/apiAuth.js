import axios from 'axios'
import { loginSuccess, registerSuccess, loginFailed } from '../reducer/authSlice'
import { apiUrl, ACCESS_TOKEN } from '../../utils/constant'
import setAuthHeader from '../../utils/setAuthHeader'

export const loginAsync = async (user, dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/login`, user)
        if (res.data.success) {
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
            dispatch(loginSuccess(res.data))
        }

        return res.data
    } catch (error) {
        console.log('', error)
    }
}

// Authenticate user
export const loadUser = () => async (dispatch) => {
    if (localStorage[ACCESS_TOKEN]) {
        setAuthHeader(localStorage[ACCESS_TOKEN])
    }
    try {
        const response = await axios.get(`${apiUrl}/auth`)

        if (response.data.success) {
            dispatch(loginSuccess(response.data.user))
        } else {
            localStorage.removeItem(ACCESS_TOKEN)
            setAuthHeader(null)
            dispatch(loginFailed())
        }
    } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN)
        setAuthHeader(null)
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/register`, user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        console.log('', error)
    }
}
