import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Homepage.scss"
import { FormattedMessage } from "react-intl"
import Services from "./Section/Services"
import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
import slide3 from "../../assets/slide3.jpg"
import icon1 from "../../assets/icon-1.png"
import icon2 from "../../assets/icon-2.png"
import icon3 from "../../assets/icon-3.png"
import { Carousel } from "react-responsive-carousel"
import { Col, Row } from "react-bootstrap"
import Footer from "../Footer/Footer"
import News from "./Section/News"

function Homepage() {
   return (
      <>
         <Header />

         <div className='banner-slide'>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
               <div className='bg-image'></div>
               <div>
                  <img src={slide2} />
               </div>
               <div>
                  <img src={slide3} />
               </div>
            </Carousel>
         </div>
         <div className='input-search-homepage'>
            <div className='input-search-border'>
               <div className='input-search-content'>
                  <input type='text' placeholder='How can I help you?' className='input-search' />
                  <span className='input-search-icon'>
                     <FontAwesomeIcon icon='search' className='input-search-icon' />
                  </span>
               </div>
            </div>
         </div>
         <Services />
         <div className='container'>
            <Row className='info-hospital'>
               <Row className='info-hospital-header'>
                  <Row className='info-hospital-header__tilte'>
                     Bệnh viện Quốc tế hàng đầu tại Hà Nội
                  </Row>
                  <Row className='info-hospital-header__text'>
                     Bệnh viện Việt Pháp Hà Nội là bệnh viện quốc tế đầu tiên tại Hà Nội và miền Bắc
                     Việt Nam
                  </Row>
               </Row>
               <Row className='info-hospital-body'>
                  <Col className='col-4  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon2} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>60%</Row>
                           <Row className='statistic-info'>Bác sĩ nước ngoài</Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        Đội ngũ bác sĩ gồm nhiều chuyên gia người Pháp có trình độ chuyên môn cao
                        thuộc nhiều chuyên khoa khác nhau.
                     </Row>
                  </Col>
                  <Col className='col-4  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon3} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>120.000+</Row>
                           <Row className='statistic-info'>Khám ngoại trú mỗi năm</Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        Bệnh viện Việt Pháp Hà Nội là địa chỉ tin cậy cho cộng đồng người Việt và
                        nước ngoài sinh sống và làm việc tại Việt Nam.
                     </Row>
                  </Col>
                  <Col className='col-4  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon1} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>25.000+</Row>
                           <Row className='statistic-info'>Ca sinh nở</Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        Hàng năm Bệnh viện Việt Pháp Hà Nội đón rất nhiều trẻ sơ sinh chào đời an
                        toàn và khỏe mạnh.
                     </Row>
                  </Col>
               </Row>
               <Row className='info-hospital-btn'>
                  <button className='main-btn col-3'>Xem video của chúng tôi</button>
                  <button className='main-btn col-2'>Làm việc tại đây</button>
               </Row>
            </Row>
         </div>

         <News />

         <Footer />
      </>
   )
}

export default Homepage
