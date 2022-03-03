import axios from "../../utils/axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constant"
import setAuthHeader, { setHeader } from "../../utils/setAuthHeader"
import { loginFailed, loginSuccess, registerSuccess } from "../reducer/authSlice"

export const loginAsync = async (user, dispatch) => {
   try {
      //check if user is exist
      if (localStorage[ACCESS_TOKEN]) {
         const response = await axios.get(`/v1/api/auth`, setHeader())
         if (response.success) {
            setAuthHeader(localStorage[ACCESS_TOKEN])
            dispatch(loginSuccess(response.user))
         } else {
            localStorage.removeItem(ACCESS_TOKEN)
            dispatch(loginFailed())
         }
      } else {
         //login if user isn't exist
         const res = await axios.post(`/v1/api/login`, user)
         if (res.success) {
            localStorage.setItem(ACCESS_TOKEN, res.accessToken)
            localStorage.setItem(REFRESH_TOKEN, res.refreshToken)
            dispatch(loginSuccess(res))
         }

         return res
      }
   } catch (error) {
      console.log("", error)
      dispatch(loginFailed())
   }
}

//x Authenticate user
// export const loadUser = () => async (dispatch) => {}

export const registerUser = async (user, dispatch) => {
   try {
      const res = await axios.post(`/v1/api/register`, user)
      dispatch(registerSuccess(res.data))
   } catch (error) {
      console.log("", error)
   }
}
