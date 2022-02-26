import "pure-react-carousel/dist/react-carousel.es.css"
import Carousel from "react-elastic-carousel"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { useNavigate } from "react-router-dom"
// import { Carousel } from 'react-responsive-carousel'
import "./Services.scss"

function Services() {
   const navigate = useNavigate()

   const language = useSelector((state) => state.languageReducer.languageState.language)
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 1, itemsToScroll: 1 },
      { width: 768, itemsToShow: 2 },
      { width: 1200, itemsToShow: 2 },
   ]

   const viewSpecialtyDetail = (id) => {
      navigate(`/detail-specialty/${id}`)
   }
   return (
      <div className='section-services'>
         <div className='service-header'>
            <h2 className='service-header-title'>
               <FormattedMessage id='homepage.service.our-service' />
            </h2>
            <div className='service-header-content'>
               <FormattedMessage id='homepage.service.our-service-content' />
            </div>
         </div>
         <div className='service-content'>
            <div className='service-slide'>
               <Carousel itemsToShow={2} breakPoints={breakPoints}>
                  {language === "vi" &&
                     allSpecialties?.map((item, index) => {
                        return (
                           <div className='service-slide-item' key={index}>
                              <div
                                 className='bg-image service-slide-img'
                                 style={{ backgroundImage: `url(${item.img})` }}
                              ></div>
                              <div className='slide-item-content'>
                                 <h4
                                    className='slide-item-content-title'
                                    onClick={() => viewSpecialtyDetail(item.id)}
                                 >
                                    {item.title}
                                 </h4>
                                 <div className='slide-item-content-body'>
                                    {item.descriptionMarkdown}
                                 </div>

                                 <div
                                    className='read-more'
                                    onClick={() => viewSpecialtyDetail(item.id)}
                                 >
                                    <FormattedMessage id='homepage.read-more' />
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  {language === "en" &&
                     allSpecialties?.map((item, index) => {
                        return (
                           <div className='service-slide-item' key={index}>
                              <div
                                 className='bg-image service-slide-img'
                                 style={{ backgroundImage: `url(${item.img})` }}
                              ></div>
                              <div className='slide-item-content'>
                                 <h4
                                    className='slide-item-content-title'
                                    onClick={() => viewSpecialtyDetail(item.id)}
                                 >
                                    {item.translationData?.title}
                                 </h4>
                                 <div className='slide-item-content-body'>
                                    {item.translationData?.descriptionMarkdown}
                                 </div>

                                 <div
                                    className='read-more'
                                    onClick={() => viewSpecialtyDetail(item.id)}
                                 >
                                    <FormattedMessage id='homepage.read-more' />
                                 </div>
                              </div>
                           </div>
                        )
                     })}
               </Carousel>
            </div>
         </div>
         <div className='see-all'>
            <button className=' main-btn'>
               <FormattedMessage id='homepage.see-all-btn' />
            </button>
         </div>
      </div>
   )
}

export default Services
