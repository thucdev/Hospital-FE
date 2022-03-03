import { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import axios from "../../../src/utils/axios"
import { loginFailed, loginSuccess } from "../../store/reducer/authSlice"
import { ACCESS_TOKEN } from "../../utils/constant"
import setAuthHeader, { setHeader } from "../../utils/setAuthHeader"
import Login from "../Login"
import RegisterForm from "../RegisterForm"
import "./Auth.scss"

function Auth({ authRoute }) {
   const dispatch = useDispatch()
   const login = useSelector((state) => state.authReducer.login)
   const { authLoading, isAuthenticated } = login

   //check if user is exist
   let checkAuth = async () => {
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
         dispatch(loginFailed())
      }
   }
   useEffect(() => {
      checkAuth()
   }, [])

   let body
   if (authLoading) {
      body = (
         <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
         </div>
      )
   } else if (authRoute === "login") {
      body = (
         <>
            <h1 className='mb-2'>Login</h1>
            <Login />
         </>
      )
   } else {
      body = (
         <>
            <h1 className='mb-2'>Register</h1>
            <RegisterForm />
         </>
      )
   }

   return isAuthenticated ? (
      <Navigate to='/system' />
   ) : (
      <>
         <div className='landing'>
            <div className='dark-overlay'>
               <div className='landing-inner'>{body}</div>
            </div>
         </div>
      </>
   )
}
export default Auth
