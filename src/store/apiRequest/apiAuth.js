import axios from "axios"
import { ACCESS_TOKEN, apiUrl, REFRESH_TOKEN } from "../../utils/constant"
import setAuthHeader from "../../utils/setAuthHeader"
import { loginFailed, loginSuccess, registerSuccess } from "../reducer/authSlice"

export const loginAsync = async (user, dispatch) => {
   try {
      const res = await axios.post(`${apiUrl}/v1/api/login`, user)
      if (res.data.success) {
         localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
         localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken)

         let data = await loadUser()(dispatch)
      }

      return res.data
   } catch (error) {
      console.log("", error)
      dispatch(loginFailed())
   }
}

//x Authenticate user
export const loadUser = () => async (dispatch) => {
   if (localStorage[ACCESS_TOKEN]) {
      setAuthHeader(localStorage[ACCESS_TOKEN])
   }
   try {
      const response = await axios.get(`${apiUrl}/v1/api/auth`, { withCredentials: true })

      if (response.data.success) {
         setAuthHeader(localStorage[ACCESS_TOKEN])
         dispatch(loginSuccess(response.data.user))
      } else {
         localStorage.removeItem(ACCESS_TOKEN)
         dispatch(loginFailed())
      }
   } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN)
      dispatch(loginFailed())
   }
}

export const registerUser = async (user, dispatch) => {
   try {
      const res = await axios.post(`${apiUrl}/v1/api/register`, user)
      dispatch(registerSuccess(res.data))
   } catch (error) {
      console.log("", error)
   }
}
