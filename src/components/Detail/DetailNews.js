import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./DetailNews.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createQuestion, getNews, getNewsById } from "../../services/userService"
import moment from "moment"
import { useNavigate, userNavigate, useParams } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import Footer from "../Footer/Footer"
import doctor from "../../assets/Services1.jpg"
import detail from "../../assets/Services1.jpg"

function DetailNews() {
   const { id } = useParams()

   const [specialty, setNews] = useState([])
   const fetchData = async () => {
      let specialty = await getNewsById(id)
      console.log("new", specialty)
      setNews(specialty.data)
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <>
         <Header />
         <div className='bg-header bg-detail-specialty'>
            <h1>Chuyên khoa nội</h1>
         </div>
         <div className='specialty-detail'>
            <div className='specialty-detail-title'>{specialty.title}</div>
            <div
               className='bg-image news-detail-img'
               style={{ backgroundImage: `url(${specialty.img})` }}
            ></div>
            <img src='' alt='' />
            <div
               dangerouslySetInnerHTML={{ __html: specialty.descriptionHTML }}
               className='specialty-detail-content mt-5 navigation-content'
            ></div>
         </div>
         <Footer />
      </>
   )
}

export default DetailNews
