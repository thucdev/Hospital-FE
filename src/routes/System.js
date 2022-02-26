import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Dropdown, Row } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { loginFailed } from "../store/reducer/authSlice"
import { changLanguageApp } from "../store/reducer/languageSlice"
import FlagIcon from "../styles/FlagIcon"
import "./System.scss"

export const System = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const isAuth = useSelector((state) => state.authReducer.login.isAuthenticated)
   const roleId = useSelector((state) => state.authReducer.login.user?.roleId)

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
   const handleChangeLanguage = () => {
      selectedLanguage === "us"
         ? dispatch(changLanguageApp("en"))
         : dispatch(changLanguageApp("vi"))
   }
   useEffect(() => {
      handleChangeLanguage()
   }, [selectedLanguage])

   const handleLogout = () => {
      localStorage.removeItem("accessToken")
      dispatch(loginFailed())
   }
   return (
      <>
         <div className='dashboard'>
            <div className='manage-navbar  '>
               <div className='manage-navbar-title'>
                  <FormattedMessage id='menu.admin.dashboard' />
               </div>
               {roleId === "R1" && (
                  <>
                     <Link className='manage-navbar-text' to='manage-doctor'>
                        <FormattedMessage id='menu.admin.manage-doctor' />
                     </Link>
                     <Link className='manage-navbar-text' to='manage-specialty'>
                        <FormattedMessage id='menu.admin.manage-specialty' />
                     </Link>
                     <Link className='manage-navbar-text' to='manage-schedule'>
                        <FormattedMessage id='menu.admin.manage-schedule' />
                     </Link>
                     <Link className='manage-navbar-text' to='manage-news'>
                        <FormattedMessage id='menu.admin.add-news' />
                     </Link>
                  </>
               )}

               {roleId === "R2" && (
                  <>
                     <Link className='manage-navbar-text' to='manage-schedule-by-doctor'>
                        <FormattedMessage id='menu.admin.manage-schedule' />
                     </Link>
                     <Link className='manage-navbar-text' to='manage-news'>
                        <FormattedMessage id='menu.admin.add-news' />
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
                           <span className='manage-menu-logout-text'>
                              <FormattedMessage id='menu.admin.logout' />
                           </span>
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
