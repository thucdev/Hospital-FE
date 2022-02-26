import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const useAuth = () => {
   const roleId = useSelector((state) => state.authReducer.login.user?.roleId)

   if (roleId === "R1" || roleId === "R2") {
      return true
   } else {
      return false
   }
}

const ProtectedRoutesDoctor = () => {
   const auth = useAuth()

   return auth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutesDoctor
