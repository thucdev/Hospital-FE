import axios from "axios"
import { ACCESS_TOKEN } from "../utils/constant"

const setAuthHeader = (token) => {
   if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      // axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
      //    "accessToken"
      // )}`
   } else {
      // delete axios.defaults.headers.common["Authorization"]
   }
}

export const setHeader = (token) => {
   if (token) {
      const header = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
      return header
   } else {
      const header = {
         headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
         },
      }
      return header
   }
}

export default setAuthHeader
