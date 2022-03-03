import { useEffect, useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import { FormattedMessage } from "react-intl"
import { useNavigate } from "react-router-dom"
import { getNews } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./NewsPage.scss"
import PaginationNews from "./PaginationNews"

function NewsPage() {
   const navigate = useNavigate()

   const [loading, setLoading] = useState(false)
   const [postNews, setPostNews] = useState([])
   const [pagination, setPagination] = useState({
      page: 0,
      limit: 6,
      total: 1,
   })

   const [filter, setFilter] = useState({
      limit: 6,
      page: 0,
   })
   const fetchData = async () => {
      setLoading(true)
      let allNews = await getNews(filter)
      setPagination({
         ...pagination,
         total: allNews.total,
      })
      setPostNews(allNews.data)
      setLoading(false)
   }

   useEffect(() => {
      fetchData()
   }, [filter])

   const handlePageChange = (newPage) => {
      setFilter({
         ...filter,
         page: newPage,
      })
      setPagination({
         ...pagination,
         page: newPage,
      })
   }

   const viewNewsDetail = (id) => {
      navigate(`/detail-news/${id}`)
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-news'>
            <h1>
               <FormattedMessage id='homepage.news.title' />
            </h1>
         </div>
         <div className='news-body'>
            <div className='container'>
               {loading === true && (
                  <div className='d-flex justify-content-center mt-2'>
                     <Spinner animation='border' variant='info' />
                  </div>
               )}
               {loading === false && (
                  <Row className='news-item-page'>
                     {postNews?.map((item, index) => {
                        return (
                           <Col sm='4' key={index} className='mb-4'>
                              <div>
                                 <div
                                    className='bg-image news-thumbnail'
                                    style={{ backgroundImage: `url(${item.img})` }}
                                 ></div>
                                 <div className='news-item-content'>
                                    <div className='news-item-info pt-3'>
                                       <FormattedMessage id='homepage.news.news' />
                                    </div>
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
                  </Row>
               )}
            </div>
            <div className='pagination-number  my-4'>
               <PaginationNews pagination={pagination} onPageChange={handlePageChange} />
            </div>
         </div>
         <Footer />
      </>
   )
}

export default NewsPage
