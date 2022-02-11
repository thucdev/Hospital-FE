import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Homepage.scss"
import { FormattedMessage } from "react-intl"
import Services from "./Section/Services"
import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
import slide3 from "../../assets/slide3.jpg"
import { Carousel } from "react-responsive-carousel"

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
      </>
   )
}

export default Homepage
