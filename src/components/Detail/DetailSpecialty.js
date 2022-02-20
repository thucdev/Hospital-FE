import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./DetailSpecialty.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createQuestion, getNews, getSpecialtyById } from "../../services/userService"
import moment from "moment"
import { useNavigate, userNavigate, useParams } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import Footer from "../Footer/Footer"
import doctor from "../../assets/Services1.jpg"
import detail from "../../assets/Services1.jpg"

function DetailSpecialty() {
   const navigate = useNavigate()
   const { id } = useParams()
   const language = useSelector((state) => state.languageReducer.languageState.language)
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   console.log("allSpecialties", allSpecialties)

   const [specialty, setSpecialty] = useState([])
   const fetchData = async () => {
      let specialty = await getSpecialtyById(id)
      setSpecialty(specialty.data)
   }

   const fetchAllSpecialty = () => {
      const listSpec = []
      const listObjEn = []
      const listDoctor = []

      allSpecialties?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         // objEn.value = item.translationData.value
         listSpec.push(obj)
         // listObjEn.push(objEn)
      })
      // setListSpecialty(listSpec)
      // setListSpecialtyEn(listObjEn)
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
            <h1>Chuyên khoa nội</h1>
         </div>

         <Row className='specialty-detail'>
            <Col className='specialty-list' sm='4'>
               <ul className='mt-5'>
                  {allSpecialties?.map((item, index) => {
                     return (
                        <li
                           className={`specialty-list-name ${id == item.id ? "active" : ""}  `}
                           onClick={() => viewAnotherSpecialty(item.id)}
                        >
                           {item.title}
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
         <Footer />
      </>
   )
}

export default DetailSpecialty
