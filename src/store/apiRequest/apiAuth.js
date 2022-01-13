import axios from 'axios'
import { loginSuccess, registerSuccess } from '../reducer/authSlice'

export const loginAsync = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post(`http://localhost:8080/v1/login`, user)
        dispatch(loginSuccess(res.data))
        navigate('/home')
    } catch (error) {
        console.log('', error)
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    try {
        console.log('vao day')
        const res = await axios.post(`http://localhost:8080/v1/register`, user)
        console.log('res', res)
        dispatch(registerSuccess(res.data))
        navigate('/login')
    } catch (error) {
        console.log('', error)
    }
}
