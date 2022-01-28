import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
// import { Carousel } from 'react-responsive-carousel'
import './Services.scss'
import service1 from '../../../assets/Services1.jpg'
import service2 from '../../../assets/Services2.jpg'
import { Button } from 'react-bootstrap'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Carousel, { consts } from 'react-elastic-carousel'
import { useSelector } from 'react-redux'

function Services() {
    const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1, itemsToScroll: 1 },
        { width: 768, itemsToShow: 2 },
        { width: 1200, itemsToShow: 2 },
    ]
    return (
        <div className='section-services'>
            <div className='service-header'>
                <h2 className='service-header-title'>Our Services</h2>
                <div className='service-header-content'>
                    At L'Hôpital Français de Hanoi you will experience high quality, international
                    standard health care
                </div>
            </div>
            <div className='service-content'>
                <div className='service-slide'>
                    <Carousel itemsToShow={2} breakPoints={breakPoints}>
                        {allSpecialties.map((item, index) => {
                            return (
                                <div className='service-slide-item'>
                                    <div
                                        className='bg-image service-slide-img'
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
                    </Carousel>
                </div>
            </div>
            <div className='see-all'>
                {/* <Button variant='outline-info'>Xem tất cả</Button> */}
                <button className='see-all-btn'>Xem tất cả</button>
            </div>
        </div>
    )
}

export default Services
