import React from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Row, Col, Stack } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./System.scss"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dropdown } from "react-bootstrap"
import FlagIcon from "../styles/FlagIcon"
import { loginFailed } from "../store/reducer/authSlice"

export const System = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   // const [roleId, setRoleId] = useState("")

   const isAuth = useSelector((state) => state.authReducer.login.isAuthenticated)
   const roleId = useSelector((state) => state.authReducer.login.user?.roleId)

   // const roleId

   useEffect(() => {
      if (!isAuth) {
         navigate("/login")
      }
   }, [isAuth])

   const [toggleContents, setToggleContents] = useState(
      <>
         <FlagIcon code='vn' /> Việt Nam
      </>
   )
   const [selectedLanguage, setSelectedLanguage] = useState({ code: "vn", title: "Việt Nam" })
   const [languages] = useState([
      { code: "vn", title: "Việt Nam" },
      { code: "us", title: "English" },
   ])

   const handleLogout = () => {
      localStorage.removeItem("accessToken")
      dispatch(loginFailed())
   }
   return (
      <>
         <div className='dashboard'>
            <div className='manage-navbar  '>
               <div className='manage-navbar-title'>DASHBOARD</div>
               {roleId === "R1" && (
                  <>
                     <Link className='manage-navbar-text' to='manage-doctor'>
                        Manage Doctor
                     </Link>
                     <Link className='manage-navbar-text' to='manage-specialty'>
                        Manage Specialty
                     </Link>
                     <Link className='manage-navbar-text' to='manage-schedule-by-doctor'>
                        Manage Schedule
                     </Link>
                     <Link className='manage-navbar-text' to='manage-news'>
                        Manage News
                     </Link>
                  </>
               )}

               {roleId === "R2" && (
                  <>
                     <Link className='manage-navbar-text' to='manage-schedule-by-doctor'>
                        Manage Schedule
                     </Link>
                     <Link className='manage-navbar-text' to='manage-news'>
                        Manage News
                     </Link>
                  </>
               )}
            </div>
            <div className='manage-header'>
               <div className='manage-menu '>
                  <Row>
                     <div className='manage-menu-logout'>
                        <>
                           <Dropdown
                              onSelect={(eventKey) => {
                                 const { code, title } = languages.find(
                                    ({ code }) => eventKey === code
                                 )

                                 setSelectedLanguage(eventKey)
                                 setToggleContents(
                                    <>
                                       <FlagIcon code={code} /> {title}
                                    </>
                                 )
                              }}
                              className='dropdown-language'
                           >
                              <Dropdown.Toggle
                                 variant='outline-info'
                                 id='dropdown-flags'
                                 className='text-left '
                                 size='sm'
                              >
                                 {toggleContents}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                 {languages.map(({ code, title }) => (
                                    <Dropdown.Item key={code} eventKey={code}>
                                       <FlagIcon code={code} /> {title}
                                    </Dropdown.Item>
                                 ))}
                              </Dropdown.Menu>
                           </Dropdown>
                        </>
                        <div className='manage-menu-logout-content' onClick={handleLogout}>
                           <span>
                              <FontAwesomeIcon icon='user-md' className='icon' />
                           </span>
                           <span className='manage-menu-logout-text'>Logout</span>
                        </div>
                     </div>
                  </Row>
                  <Row>
                     <div className='manage-menu-body '>
                        <div className='menu-manage-doctor'>
                           <span>
                              <Outlet />
                           </span>
                        </div>
                     </div>
                  </Row>
               </div>
            </div>
         </div>
      </>
   )
}
