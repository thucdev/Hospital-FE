import "pure-react-carousel/dist/react-carousel.es.css"
import { useEffect, useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getNews } from "../../../services/userService"
import "./News.scss"

function News() {
   const navigate = useNavigate()
   const language = useSelector((state) => state.languageReducer.languageState.language)
   const [loading, setLoading] = useState(false)

   const [filter, setFilter] = useState({
      limit: 3,
      page: 0,
   })
   const [postNews, setPostNews] = useState([])

   const fetchData = async () => {
      setLoading(true)

      let allNews = await getNews(filter)
      setPostNews(allNews.data)
      setLoading(false)
   }

   useEffect(() => {
      fetchData()
   }, [filter])

   const viewNewsDetail = (id) => {
      navigate(`/detail-news/${id}`)
   }
   return (
      <div className='section-news '>
         <div className='container'>
            <div className='news-header'>
               <h2 className='news-header-title'>
                  <FormattedMessage id='homepage.news.title' />
               </h2>
            </div>
            <div className='news-content d-flex justify-content-center mx-auto'>
               <Row className='news-slide '>
                  {/* {language === "vi" && */}
                  {loading === true && (
                     <div className='d-flex justify-content-center mt-2'>
                        <Spinner animation='border' variant='info' />
                     </div>
                  )}
                  {loading === false && (
                     <>
                        {postNews?.map((item, index) => {
                           return (
                              <Col sm='4' key={index}>
                                 <div className='news-item mb-3'>
                                    <div
                                       // className='bg-image news-thumbnail'
                                       className='news-thumbnail'
                                       style={{ backgroundImage: `url(${item.img})` }}
                                    ></div>
                                    <div className='news-item-content'>
                                       <div className='news-item-info pt-3'>Tin tức</div>
                                       <h4
                                          className='news-item-content-title'
                                          onClick={() => viewNewsDetail(item.id)}
                                       >
                                          {item.title}
                                       </h4>
                                       <div
                                          className='read-more'
                                          onClick={() => viewNewsDetail(item.id)}
                                       >
                                          <FormattedMessage id='homepage.read-more' />
                                       </div>
                                    </div>
                                 </div>
                              </Col>
                           )
                        })}
                     </>
                  )}
               </Row>
            </div>
            <div className='see-all-new'>
               <button className=' main-btn see-all-new-btn' onClick={() => navigate("/news")}>
                  <FormattedMessage id='homepage.see-all-btn' />
               </button>
            </div>
         </div>
      </div>
   )
}

export default News
