import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"
import { ACCESS_TOKEN, apiUrl, REFRESH_TOKEN } from "./constant"
const refreshToken = async () => {
   let refreshToken = localStorage.getItem(REFRESH_TOKEN)

   try {
      const res = await axios.post(
         `${apiUrl}/v1/api/refresh`,
         { refreshToken }
         // {
         //    withCredentials: true,
         //    credentials: "include",
         // }
      )
      if (res.success === false) {
         return <Navigate to='/login' />
      }
      return res.data
   } catch (error) {
      console.log("er", error)
   }
}

export const createAxios = () => {
   const newInstance = axios.create({
      withCredentials: true,
      baseURL: apiUrl,
   })
   newInstance.interceptors.request.use(async (config) => {
      let accessToken = localStorage.getItem(ACCESS_TOKEN)
      const decodedToken = jwt_decode(accessToken)
      if (decodedToken.exp * 1000 < Date.now()) {
         const data = await refreshToken()

         if (data?.success) {
            localStorage.setItem(ACCESS_TOKEN, data.newAccessToken)
            localStorage.setItem(REFRESH_TOKEN, data.newRefreshToken)
            config.headers.Authorization = "Bearer " + data.newAccessToken
         }
      }
      return config
   })
   return newInstance
}
