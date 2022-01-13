import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
// import { Carousel } from 'react-responsive-carousel'
import './Services.scss'
import service1 from '../../../assets/Services1.jpg'
import service2 from '../../../assets/Services2.jpg'
import { Button } from 'react-bootstrap'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Carousel from 'react-elastic-carousel'

function Services() {
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
                    <Carousel itemsToShow={2}>
                        <div className='service-slide-item'>
                            <div className='bg-image service-slide-img'>
                                {/* <img src={service1} /> */}
                            </div>
                            <div className='slide-item-content'>
                                <h4 className='slide-item-content-title'>
                                    body content Lorem ipsum dolo
                                </h4>
                                <div className='slide-item-content-body'>
                                    body content Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Eos fugiat voluptatibus perspiciatis eum placeat dolores
                                    suscipit quia quis veritatis quae corrupti officiis, aspernatur
                                    omnis tempora doloremque provident nesciunt quo est. Lorem ipsum
                                    dolor, sit amet consectetur adipisicing elit. Itaque harum omnis
                                    consectetur sunt tempore natus reprehenderit minus iusto, facere
                                    aspernatur animi nemo quos rerum laborum eaque, repellendus
                                    ducimus dolore veniam. Ipsam ad quod sunt perferendis, veniam
                                    eius repudiandae aliquid neque, in hic adipisci fugit veritatis
                                    perspiciatis omnis rem rerum eligendi aspernatur possimus
                                    magnam, sint error. Nemo error optio et ab. Enim quas magnam
                                    cum, fugit cumque laboriosam, quae iusto quibusdam voluptatum
                                    labore nemo culpa ex. Possimus officia deserunt id hic odio
                                    veniam enim quam? A dicta corporis fugiat ex est. Neque atque
                                    ipsum libero voluptatum quas alias, magni dolore unde? Fuga,
                                    placeat nihil dicta officiis dolorum in quia. Possimus officia
                                    harum dolore facilis eum aliquam maiores quae corrupti. Nam,
                                    fugiat. Harum ea omnis amet est laudantium quae voluptas
                                    exercitationem provident? Eveniet, sit delectus cumque unde
                                    saepe est corporis quo illum ipsam aliquam numquam totam earum
                                    id optio, quis quia rerum.
                                </div>

                                <div className='read-more'>Readmore</div>
                            </div>
                        </div>
                        <div className='service-slide-item'>
                            <div className='bg-image service-slide-img'>
                                {/* <img src={service1} /> */}
                            </div>
                            <div className='slide-item-content'>
                                <h4 className='slide-item-content-title'>
                                    body content Lorem ipsum dolo
                                </h4>
                                <div className='slide-item-content-body'>
                                    body content Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Eos fugiat voluptatibus perspiciatis eum placeat dolores
                                    suscipit quia quis veritatis quae corrupti officiis, aspernatur
                                    omnis tempora doloremque provident nesciunt quo est. Lorem ipsum
                                    dolor, sit amet consectetur adipisicing elit. Itaque harum omnis
                                    consectetur sunt tempore natus reprehenderit minus iusto, facere
                                    aspernatur animi nemo quos rerum laborum eaque, repellendus
                                    ducimus dolore veniam. Ipsam ad quod sunt perferendis, veniam
                                    eius repudiandae aliquid neque, in hic adipisci fugit veritatis
                                    perspiciatis omnis rem rerum eligendi aspernatur possimus
                                    magnam, sint error. Nemo error optio et ab. Enim quas magnam
                                    cum, fugit cumque laboriosam, quae iusto quibusdam voluptatum
                                    labore nemo culpa ex. Possimus officia deserunt id hic odio
                                    veniam enim quam? A dicta corporis fugiat ex est. Neque atque
                                    ipsum libero voluptatum quas alias, magni dolore unde? Fuga,
                                    placeat nihil dicta officiis dolorum in quia. Possimus officia
                                    harum dolore facilis eum aliquam maiores quae corrupti. Nam,
                                    fugiat. Harum ea omnis amet est laudantium quae voluptas
                                    exercitationem provident? Eveniet, sit delectus cumque unde
                                    saepe est corporis quo illum ipsam aliquam numquam totam earum
                                    id optio, quis quia rerum.
                                </div>

                                <div className='read-more'>Readmore</div>
                            </div>
                        </div>
                        <div className='service-slide-item'>
                            <div className='bg-image service-slide-img'>
                                {/* <img src={service1} /> */}
                            </div>
                            <div className='slide-item-content'>
                                <h4 className='slide-item-content-title'>
                                    body content Lorem ipsum dolo
                                </h4>
                                <div className='slide-item-content-body'>
                                    body content Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Eos fugiat voluptatibus perspiciatis eum placeat dolores
                                    suscipit quia quis veritatis quae corrupti officiis, aspernatur
                                    omnis tempora doloremque provident nesciunt quo est. Lorem ipsum
                                    dolor, sit amet consectetur adipisicing elit. Itaque harum omnis
                                    consectetur sunt tempore natus reprehenderit minus iusto, facere
                                    aspernatur animi nemo quos rerum laborum eaque, repellendus
                                    ducimus dolore veniam. Ipsam ad quod sunt perferendis, veniam
                                    eius repudiandae aliquid neque, in hic adipisci fugit veritatis
                                    perspiciatis omnis rem rerum eligendi aspernatur possimus
                                    magnam, sint error. Nemo error optio et ab. Enim quas magnam
                                    cum, fugit cumque laboriosam, quae iusto quibusdam voluptatum
                                    labore nemo culpa ex. Possimus officia deserunt id hic odio
                                    veniam enim quam? A dicta corporis fugiat ex est. Neque atque
                                    ipsum libero voluptatum quas alias, magni dolore unde? Fuga,
                                    placeat nihil dicta officiis dolorum in quia. Possimus officia
                                    harum dolore facilis eum aliquam maiores quae corrupti. Nam,
                                    fugiat. Harum ea omnis amet est laudantium quae voluptas
                                    exercitationem provident? Eveniet, sit delectus cumque unde
                                    saepe est corporis quo illum ipsam aliquam numquam totam earum
                                    id optio, quis quia rerum.
                                </div>

                                <div className='read-more'>Readmore</div>
                            </div>
                        </div>
                        <div className='service-slide-item'>
                            <div className='bg-image service-slide-img'>
                                {/* <img src={service1} /> */}
                            </div>
                            <div className='slide-item-content'>
                                <h4 className='slide-item-content-title'>
                                    body content Lorem ipsum dolo
                                </h4>
                                <div className='slide-item-content-body'>
                                    body content Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Eos fugiat voluptatibus perspiciatis eum placeat dolores
                                    suscipit quia quis veritatis quae corrupti officiis, aspernatur
                                    omnis tempora doloremque provident nesciunt quo est. Lorem ipsum
                                    dolor, sit amet consectetur adipisicing elit. Itaque harum omnis
                                    consectetur sunt tempore natus reprehenderit minus iusto, facere
                                    aspernatur animi nemo quos rerum laborum eaque, repellendus
                                    ducimus dolore veniam. Ipsam ad quod sunt perferendis, veniam
                                    eius repudiandae aliquid neque, in hic adipisci fugit veritatis
                                    perspiciatis omnis rem rerum eligendi aspernatur possimus
                                    magnam, sint error. Nemo error optio et ab. Enim quas magnam
                                    cum, fugit cumque laboriosam, quae iusto quibusdam voluptatum
                                    labore nemo culpa ex. Possimus officia deserunt id hic odio
                                    veniam enim quam? A dicta corporis fugiat ex est. Neque atque
                                    ipsum libero voluptatum quas alias, magni dolore unde? Fuga,
                                    placeat nihil dicta officiis dolorum in quia. Possimus officia
                                    harum dolore facilis eum aliquam maiores quae corrupti. Nam,
                                    fugiat. Harum ea omnis amet est laudantium quae voluptas
                                    exercitationem provident? Eveniet, sit delectus cumque unde
                                    saepe est corporis quo illum ipsam aliquam numquam totam earum
                                    id optio, quis quia rerum.
                                </div>

                                <div className='read-more'>Readmore</div>
                            </div>
                        </div>
                        <div>
                            <img src={service2} />
                        </div>
                        <div>
                            <img src={service1} />
                        </div>
                        <div className=''>
                            <img src={service2} />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className='see-all'>
                {/* <Button variant='info'>Xem tất cả</Button> */}
                <button className='see-all-btn'>Xem tất cả</button>
            </div>
        </div>
    )
}

export default Services
