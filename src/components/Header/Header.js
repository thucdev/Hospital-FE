import { FormattedMessage } from "react-intl"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from "react-redux"
import VN from "../../assets/vi.png"
import EN from "../../assets/en.png"
import Logo from "../../assets/Logo.png"
import navGroup1 from "../../assets/user.png"
import navGroup3 from "../../assets/group-3.png"
import navGroup2 from "../../assets/group-2.png"
import navGroup from "../../assets/group-1.png"

import "./Header.scss"
import { Link, useNavigate } from "react-router-dom"
import { changLanguageApp } from "../../store/reducer/languageSlice"

function Header() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const language = useSelector((state) => state.languageReducer.languageState.language)

   const handleChangeLanguage = (lang) => {
      lang === "vi" ? dispatch(changLanguageApp("vi")) : dispatch(changLanguageApp("en"))
   }

   return (
      <header>
         <div className='main-utility'>
            <div className='test' onClick={() => navigate("/booking-appointment")}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='24'
                  viewBox='0 0 18 24'
                  className='text-test'
               >
                  <g
                     fill='none'
                     fillRule='evenodd'
                     stroke='#FFF'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                  >
                     <path d='M13 4h4v19H1V4h4' />
                     <path d='M11 3a2 2 0 1 0-4 0H5v4h8V3h-2zM5 11h8M5 15h8M5 19h3' />
                  </g>
               </svg>
               <FormattedMessage id='homeheader.test' />
            </div>

            <div className='language-option'>
               <img src={language === "vi" ? VN : EN} alt='' className='flag-icon' />
               {language === "vi" ? "VN" : "EN"}
               <FontAwesomeIcon icon='chevron-down' className='language-option-icon' />
               <ul className='language-list '>
                  <li
                     className={
                        language === "vi" ? "language-item-active language-item " : "language-item "
                     }
                     onClick={handleChangeLanguage.bind(this, "vi")}
                  >
                     <img src={VN} alt='' />
                     <span>Việt Nam</span>
                  </li>
                  <li
                     className={
                        language === "en" ? "language-item-active language-item " : "language-item "
                     }
                     onClick={handleChangeLanguage.bind(this, "en")}
                  >
                     <img src={EN} alt='' />
                     <span> English</span>
                  </li>
               </ul>
            </div>
            <div className='phone-contact'>
               <FontAwesomeIcon icon='phone' className='phone-icon' />
               <FormattedMessage id='homeheader.call-us' />
            </div>
            <div className='login' onClick={() => navigate("/login")}>
               <FontAwesomeIcon icon='user' className='login-icon' />
               <FormattedMessage id='homeheader.login' />
            </div>
         </div>

         <div className='main-menu'>
            <div className='logo' onClick={() => navigate("/")}>
               <img src={Logo} alt='' />
            </div>
            <div className='main-menu-content'>
               <div className='menu-content-list'>
                  <ul className='menu-content-ul'>
                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.medical-services' />
                           </span>
                           <FontAwesomeIcon icon='chevron-down' className='arrow-down-icon' />
                        </div>
                        <li className='content-item-expand'>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item1' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item2' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item3' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item4' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item5' />
                           </li>
                        </li>
                     </li>
                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.patient-guide' />
                           </span>
                           <FontAwesomeIcon icon='chevron-down' className='arrow-down-icon' />
                        </div>
                        <li className='content-item-expand'>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item6' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item7' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item8' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item9' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item10' />
                           </li>
                        </li>
                     </li>
                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.maternity' />
                           </span>
                           <FontAwesomeIcon icon='chevron-down' className='arrow-down-icon' />
                        </div>
                        <li className='content-item-expand'>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item11' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item12' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item13' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item14' />
                           </li>
                        </li>
                     </li>

                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.news' />
                           </span>
                           <FontAwesomeIcon icon='chevron-down' className='arrow-down-icon' />
                        </div>
                        <li className='content-item-expand'>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item15' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item16' />
                           </li>
                        </li>
                     </li>
                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.about' />
                           </span>
                           <FontAwesomeIcon icon='chevron-down' className='arrow-down-icon' />
                        </div>
                        <li className='content-item-expand'>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item17' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item18' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item19' />
                           </li>
                           <li className='content-item-detail'>
                              <FormattedMessage id='main-menu.item20' />
                           </li>
                        </li>
                     </li>
                     <li className='content-item'>
                        <div className='content-item-title'>
                           <span>
                              <FormattedMessage id='main-menu.contact' />
                           </span>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className='navbar-contact'>
            <div className='navbar-item' onClick={() => navigate("/find-doctor")}>
               <div className='navbar-icon'>
                  <img src={navGroup1} alt='' />
               </div>
               <span className='navbar-item-title'>
                  <FormattedMessage id='main-menu.find-doctor' />
               </span>
            </div>
            <div className='navbar-item' onClick={() => navigate("/booking-appointment")}>
               <div className='navbar-icon'>
                  <img src={navGroup3} alt='' />
               </div>
               <span className='navbar-item-title'>
                  <FormattedMessage id='main-menu.appointment' />
               </span>
            </div>
            <div className='navbar-item' onClick={() => navigate("/news")}>
               <div className='navbar-icon'>
                  <img src={navGroup2} alt='' />
               </div>
               <span className='navbar-item-title'>
                  <FormattedMessage id='main-menu.treatment' />
               </span>
            </div>
            <div className='navbar-item' onClick={() => navigate("/ask-doctor")}>
               <div className='navbar-icon'>
                  <img src={navGroup} alt='' />
               </div>
               <span className='navbar-item-title'>
                  <FormattedMessage id='main-menu.inquiry' />
               </span>
            </div>
         </div>
      </header>
   )
}
export default Header
