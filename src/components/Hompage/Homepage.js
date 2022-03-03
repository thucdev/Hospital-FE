import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Row } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import { Carousel } from "react-responsive-carousel"
import icon1 from "../../assets/icon-1.png"
import icon2 from "../../assets/icon-2.png"
import icon3 from "../../assets/icon-3.png"
import slide2 from "../../assets/slide2.jpg"
import slide3 from "../../assets/slide3.jpg"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./Homepage.scss"
import News from "./Section/News"
import Services from "./Section/Services"

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
                     <FormattedMessage id='homepage.info.title' />
                  </Row>
                  <Row className='info-hospital-header__text'>
                     <FormattedMessage id='homepage.info.content' />
                  </Row>
               </Row>
               <Row className='info-hospital-body'>
                  <div className='col-lg-4 col-sm-12 col-md-12  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon2} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>60%</Row>
                           <Row className='statistic-info'>
                              <FormattedMessage id='homepage.info.item.international-doctor' />
                           </Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        <FormattedMessage id='homepage.info.item.content1' />
                     </Row>
                  </div>
                  <div className='col-lg-4 col-sm-12 col-md-12  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon3} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>120.000+</Row>
                           <Row className='statistic-info'>
                              <FormattedMessage id='homepage.info.item.consultations' />
                           </Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        <FormattedMessage id='homepage.info.item.content2' />
                     </Row>
                  </div>
                  <div className='col-lg-4 col-sm-12 col-md-12  px-4'>
                     <Row className=' mb-3'>
                        <Col className='col-3 p-0'>
                           <img src={icon1} alt='' />
                        </Col>
                        <Col className='col-8 info-hospital-body-statistic'>
                           <Row className='statistic-percent mb-2'>25.000+</Row>
                           <Row className='statistic-info'>
                              <FormattedMessage id='homepage.info.item.born' />
                           </Row>
                        </Col>
                     </Row>
                     <Row className='info-hospital-content'>
                        <FormattedMessage id='homepage.info.item.content3' />
                     </Row>
                  </div>
               </Row>
               <Row className='info-hospital-btn'>
                  <button className='main-btn col-3'>
                     <FormattedMessage id='homepage.info.video' />
                  </button>
                  <button className='main-btn col-2'>
                     <FormattedMessage id='homepage.info.working' />
                  </button>
               </Row>
            </Row>
         </div>

         <News />
         <Footer />
      </>
   )
}

export default Homepage
