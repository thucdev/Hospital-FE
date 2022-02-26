import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getSpecialtyById } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./DetailSpecialty.scss"

function DetailSpecialty() {
   const navigate = useNavigate()
   const { id } = useParams()
   const language = useSelector((state) => state.languageReducer.languageState.language)
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

   const [specialty, setSpecialty] = useState([])
   const fetchData = async () => {
      let specialty = await getSpecialtyById(id)
      setSpecialty(specialty.data)
   }

   useEffect(() => {
      fetchData()
   }, [id])

   const viewAnotherSpecialty = (id) => {
      navigate(`/detail-specialty/${id}`)
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-detail-specialty'>
            <h1>
               <FormattedMessage id='detail.specialty.title' />
            </h1>
         </div>

         {language === "vi" && (
            <Row className='specialty-detail'>
               <Col className='specialty-list' sm='4'>
                  <ul className='mt-5'>
                     {allSpecialties?.map((item, index) => {
                        return (
                           <li
                              key={index}
                              className={`specialty-list-name ${id == item.id ? "active" : ""}  `}
                              onClick={() => viewAnotherSpecialty(item.id)}
                           >
                              {item.translationData.title}
                           </li>
                        )
                     })}
                  </ul>
               </Col>
               <Col sm='8'>
                  <div className='specialty-detail-title'>{specialty.title}</div>

                  <div
                     dangerouslySetInnerHTML={{ __html: specialty.descriptionHTML }}
                     className='specialty-detail-content mt-5 navigation-content'
                  ></div>
                  <div
                     className='bg-image specialty-detail-img'
                     style={{ backgroundImage: `url(${specialty.img})` }}
                  ></div>
               </Col>
            </Row>
         )}
         {language === "en" && (
            <Row className='specialty-detail'>
               <Col className='specialty-list' sm='4'>
                  <ul className='mt-5'>
                     {allSpecialties?.map((item, index) => {
                        return (
                           <li
                              key={index}
                              className={`specialty-list-name ${id == item.id ? "active" : ""}  `}
                              onClick={() => viewAnotherSpecialty(item.id)}
                           >
                              {item.translationData?.title}
                           </li>
                        )
                     })}
                  </ul>
               </Col>
               <Col sm='8'>
                  <div className='specialty-detail-title'>{specialty.translationData?.title}</div>

                  <div
                     dangerouslySetInnerHTML={{
                        __html: specialty.translationData?.descriptionHTML,
                     }}
                     className='specialty-detail-content mt-5 navigation-content'
                  ></div>
                  <div
                     className='bg-image specialty-detail-img'
                     style={{ backgroundImage: `url(${specialty.img})` }}
                  ></div>
               </Col>
            </Row>
         )}
         <Footer />
      </>
   )
}

export default DetailSpecialty
