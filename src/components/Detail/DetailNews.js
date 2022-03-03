import { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom"
import { getNewsById } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./DetailNews.scss"

function DetailNews() {
   const { id } = useParams()

   const [specialty, setNews] = useState([])
   const fetchData = async () => {
      let specialty = await getNewsById(id)
      setNews(specialty.data)
   }

   useEffect(() => {
      fetchData()
   }, [fetchData])

   return (
      <>
         <Header />
         <div className='bg-header bg-detail-specialty'>
            <h1>Tin tức</h1>
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
