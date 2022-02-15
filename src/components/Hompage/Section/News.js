import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
// import { Carousel } from 'react-responsive-carousel'
import "./News.scss"
import { Button } from "react-bootstrap"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import Carousel, { consts } from "react-elastic-carousel"
import { useSelector } from "react-redux"

function News() {
   const language = useSelector((state) => state.languageReducer.languageState.language)
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   console.log("allSpecialties", allSpecialties)
   const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 1, itemsToScroll: 1 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 3 },
   ]
   return (
      <div className='section-news'>
         <div className='news-header'>
            <h2 className='news-header-title'>Tin Tức và Sự Kiện</h2>
            {/* <div className='news-header-content'>
               At L'Hôpital Français de Hanoi you will experience high quality, international
               standard health care
            </div> */}
         </div>
         <div className='news-content'>
            <div className='news-slide'>
               <Carousel itemsToShow={2} breakPoints={breakPoints}>
                  {language === "vi" &&
                     allSpecialties?.map((item, index) => {
                        return (
                           <div className='news-slide-item' key={index}>
                              <div
                                 className='bg-image news-slide-img'
                                 style={{ backgroundImage: `url(${item.img})` }}
                              ></div>
                              <div className='slide-item-content'>
                                 <h4 className='slide-item-content-title'>{item.title}</h4>
                                 <div className='slide-item-content-body'>
                                    {item.descriptionMarkdown}
                                 </div>

                                 <div className='read-more'>Read more</div>
                              </div>
                           </div>
                        )
                     })}
                  {language === "en" &&
                     allSpecialties?.map((item, index) => {
                        return (
                           <div className='news-slide-item' key={index}>
                              <div
                                 className='bg-image news-slide-img'
                                 style={{ backgroundImage: `url(${item.img})` }}
                              ></div>
                              <div className='slide-item-content'>
                                 <h4 className='slide-item-content-title'>
                                    {item.translationData?.title}
                                 </h4>
                                 <div className='slide-item-content-body'>
                                    {item.translationData?.descriptionMarkdown}
                                 </div>

                                 <div className='read-more'>Read more</div>
                              </div>
                           </div>
                        )
                     })}
               </Carousel>
            </div>
         </div>
         <div className='see-all-new'>
            {/* <Button variant='outline-info'>Xem tất cả</Button> */}
            <button className=' main-btn see-all-new-btn'>Xem tất cả</button>
         </div>
      </div>
   )
}

export default News
