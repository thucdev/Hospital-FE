import { useEffect } from "react"
import { Spinner } from "react-bootstrap"

import Login from "../Login"
import RegisterForm from "../RegisterForm"
import "./Auth.scss"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../../store/apiRequest/apiAuth"
import { Navigate } from "react-router-dom"

function Auth({ authRoute }) {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(loadUser())
   }, [dispatch])

   const login = useSelector((state) => state.authReducer.login)
   const { authLoading, isAuthenticated } = login

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
            <h1>Login</h1>
            <Login />
         </>
      )
   } else {
      body = (
         <>
            <h1>Register</h1>
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
