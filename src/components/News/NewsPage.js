import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./NewsPage.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createQuestion, getNews } from "../../services/userService"
import moment from "moment"
import { useNavigate, userNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import Footer from "../Footer/Footer"
import doctor from "../../assets/Services1.jpg"
import PaginationNews from "./PaginationNews"

function NewsPage() {
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [postPerPage, setPostPerPage] = useState(3)

   const [postNews, setPostNews] = useState([])

   ///////
   const [pagination, setPagination] = useState({
      page: 1,
      limit: 3,
      total: 1,
   })

   const [filter, setFilter] = useState({
      limit: 3,
      page: 0,
   })
   const fetchData = async () => {
      setLoading(true)
      // let allNews = await getNews(pagination)
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

         // total: allNews.total,
      })
   }

   const handleOrderAppointment = async () => {
      try {
         // let res = await createQuestion({ askingData })
         // if (res.success) {
         //    toast.success("Send your question success")
         // } else {
         //    toast.error("Send your question fail")
         // }
      } catch (error) {
         console.log("er", error)
      }
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-news'>
            <h1>Tin Tức</h1>
         </div>
         <div className='news-body'>
            {loading === true && (
               <div className='d-flex justify-content-center mt-2'>
                  <Spinner animation='border' variant='info' />
               </div>
            )}
            {loading === false && (
               <Row>
                  {postNews?.map((item, index) => {
                     return (
                        <Col sm='4' key={index}>
                           <div className='news-item'>
                              <div
                                 className='bg-image news-thumbnail'
                                 style={{ backgroundImage: `url(${item.img})` }}
                              ></div>
                              <div className='news-item-content'>
                                 <div className='news-item-info pt-3'>Tin tức</div>
                                 <h4 className='news-item-content-title'>{item.title}</h4>
                                 {/* <div className='news-item-content-body'>item.descriptionMarkdown</div> */}

                                 <div className='read-more'>Read more</div>
                              </div>
                           </div>
                        </Col>
                     )
                  })}
               </Row>
            )}
         </div>
         <div className='pagination-number my-4'>
            <PaginationNews pagination={pagination} onPageChange={handlePageChange} />
         </div>
         <Footer />
      </>
   )
}

export default NewsPage
