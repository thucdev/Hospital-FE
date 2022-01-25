import { FormattedMessage } from 'react-intl'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VN from '../../assets/vi.png'
import EN from '../../assets/en.png'
import Logo from '../../assets/Logo.png'
import navGroup1 from '../../assets/user.png'
import navGroup3 from '../../assets/group-3.png'
import navGroup2 from '../../assets/group-2.png'
import navGroup from '../../assets/group-1.png'
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import './Header.scss'
import { useNavigate, Navigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <header>
            <div className='main-utility'>
                <div className='test'>
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
                    <FormattedMessage id='homeheader.specialty' />
                </div>

                <div className='language-option'>
                    VI
                    <FontAwesomeIcon icon='chevron-down' className='language-option-icon' />
                    <ul className='language-list '>
                        <li className='language-item language-item-active'>
                            <img src={VN} alt='' />
                            <div>Việt Nam</div>
                        </li>
                        <li className='language-item'>
                            <img src={EN} alt='' />
                            <div> English</div>
                        </li>
                    </ul>
                </div>
                <div className='phone-contact'>
                    <FontAwesomeIcon icon='phone' className='phone-icon' />
                    Goi chung toi
                </div>
                <div className='login' onClick={handleLogin}>
                    <FontAwesomeIcon icon='user' className='login-icon' />
                    Login
                </div>
            </div>
            <div className='main-menu'>
                <div className='logo'>
                    <img src={Logo} alt='' />
                </div>
                <div className='main-menu-content'>
                    <div className='menu-content-list'>
                        <ul className='menu-content-ul'>
                            <li className='content-item'>
                                <div className='content-item-title'>
                                    <span>DỊCH VỤ Y TẾ</span>
                                    <FontAwesomeIcon
                                        icon='chevron-down'
                                        className='arrow-down-icon'
                                    />
                                </div>
                                <li className='content-item-expand'>
                                    <li className='content-item-detail'>Chuyên khoa nội</li>
                                    <li className='content-item-detail'>Chuyên khoa ngoại</li>
                                </li>
                            </li>
                            <li className='content-item'>
                                <div className='content-item-title'>
                                    <span>DỊCH VỤ Y TẾ moi nhat</span>
                                    <FontAwesomeIcon
                                        icon='chevron-down'
                                        className='arrow-down-icon'
                                    />
                                </div>
                                <li className='content-item-expand'>
                                    <li className='content-item-detail'>Chuyên khoa nội</li>
                                    <li className='content-item-detail'>Chuyên khoa ngoại</li>
                                </li>
                            </li>
                            <li className='content-item'>
                                <div className='content-item-title'>
                                    <span>DỊCH VỤ Y TẾ moi nhat</span>
                                    <FontAwesomeIcon
                                        icon='chevron-down'
                                        className='arrow-down-icon'
                                    />
                                </div>
                                <li className='content-item-expand'>
                                    <li className='content-item-detail'>Chuyên khoa nội</li>
                                    <li className='content-item-detail'>Chuyên khoa ngoại</li>
                                </li>
                            </li>
                            <li className='content-item'>
                                <div className='content-item-title'>
                                    <span>DỊCH VỤ Y TẾ moi nhat</span>
                                    <FontAwesomeIcon
                                        icon='chevron-down'
                                        className='arrow-down-icon'
                                    />
                                </div>
                                <li className='content-item-expand'>
                                    <li className='content-item-detail'>Chuyên khoa nội</li>
                                    <li className='content-item-detail'>Chuyên khoa ngoại</li>
                                    <li className='content-item-detail'>
                                        Chuyên khoa aaaaaaangoại
                                    </li>
                                </li>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='navbar-contact'>
                <div className='navbar-item'>
                    <div className='navbar-icon'>
                        <img src={navGroup1} alt='' />
                    </div>
                    <span>Tìm bác sĩ</span>
                </div>
                <div className='navbar-item'>
                    <div className='navbar-icon'>
                        <img src={navGroup3} alt='' />
                    </div>
                    <span>Đặt lịch khám bệnh</span>
                </div>
                <div className='navbar-item'>
                    <div className='navbar-icon'>
                        <img src={navGroup2} alt='' />
                    </div>
                    <span>Tìm bác sĩ</span>
                </div>
                <div className='navbar-item'>
                    <div className='navbar-icon'>
                        <img src={navGroup} alt='' />
                    </div>
                    <span>Tìm bác sĩ</span>
                </div>
            </div>

            <div className='banner-slide'>
                {/* <img src={slide1} alt='' /> */}
                <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                    <div className='bg-image'></div>
                    <div>
                        <img src={slide2} />
                    </div>
                    <div>
                        <img src={slide3} />
                    </div>
                    {/* <div>
                        <img src='../../assets/slide2.jpg' />
                        <p className='legend'>Legend 2</p>
                    </div> */}
                </Carousel>
            </div>
        </header>
    )
}
export default Header
