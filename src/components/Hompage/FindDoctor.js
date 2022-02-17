import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./FindDoctor.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button, Accordion } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createAppointment, getDoctorById, getSpecialtyById } from "../../services/userService"
import moment from "moment"
import { useNavigate, userNavigate } from "react-router-dom"
import Footer from "../Footer/Footer"
import doctor1 from "../../assets/doctor1.jpg"
import { Certificate } from "crypto"

function FindDoctor() {
   const navigate = useNavigate()

   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const allDoctors = useSelector((state) => state.userReducer.allDoctor)

   console.log("allDoctors", allDoctors)

   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [selectedDoctor, setSelectedDoctor] = useState({
      value: "",
      label: "",
   })

   const [displayDoctor, setDisplayDoctor] = useState([])
   const [listSpecialty, setListSpecialty] = useState([])
   const [listDoctor, setListDoctor] = useState([])
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
      setListSpecialty(listSpec)
      // setListSpecialtyEn(listObjEn)
   }

   const handleChangeSelectSpecialty = async (selectedOption) => {
      try {
         let res = await getSpecialtyById(selectedOption.value)
         if (res?.data) {
            setSelectedSpecialty({
               label: res.data.title,
               value: res.data.id,
            })
         }

         let doctorArr = allDoctors.filter((item) => item.specialtyId === selectedOption.value)
         if (doctorArr) {
            let listDoctor = []
            doctorArr?.map((item) => {
               let obj = {}
               obj.label = item.fullName
               obj.value = item.id
               listDoctor.push(obj)
            })
            setListDoctor(listDoctor)
         }
      } catch (error) {
         console.log("", error)
      }
   }

   const findSpecialtyName = (id) => {
      let data = allSpecialties.filter((item) => item.id === id)
      let name = data[0].title
      return name
   }

   const handleChangeSelectDoctor = async (selectedOption) => {
      try {
         let doctorInfo = allDoctors.filter((item) => item.id === selectedOption.value)
         let data = doctorInfo.reduce((obj, item) => ({ ...item }), {})
         setSelectedDoctor({
            label: data.fullName,
            value: data.id,
         })
      } catch (error) {
         console.log("", error)
      }
   }

   useEffect(() => {
      fetchAllSpecialty()
   }, [])

   const findDoctor = async () => {
      try {
         if (selectedSpecialty && selectedDoctor.value) {
            let doctorInfo = allDoctors.filter((item) => item.id === selectedDoctor.value)
            let data = doctorInfo.map((item) => ({
               ...item,
               specialtyName: findSpecialtyName(item.specialtyId),
            }))
            console.log("data", data)
            setDisplayDoctor(data)
         }
         if (!selectedDoctor.value) {
            let doctorInfo = allDoctors.filter(
               (item) => item.specialtyId === selectedSpecialty.value
            )

            let data = doctorInfo.map((item) => ({
               ...item,
               specialtyName: findSpecialtyName(item.specialtyId),
            }))
            setDisplayDoctor(data)
            // setDisplayDoctor(doctorInfo)
            // setDisplayDoctor(listDoctor)
            console.log("displa", displayDoctor)
         }
      } catch (error) {
         console.log("er", error)
      }
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-find-doctor'>
            <h1>Tìm bác sĩ</h1>
         </div>

         <div className='find-doctor-body'>
            <div className='find-doctor-form'>
               <div className='find-doctor-form-body'>
                  <Form>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3'>
                           Chọn chuyên khoa
                        </Form.Label>
                        <Col sm='8'>
                           <Select
                              value={selectedSpecialty}
                              options={listSpecialty}
                              className='manage-specialty-select'
                              onChange={handleChangeSelectSpecialty}
                           />
                        </Col>
                     </Form.Group>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3'>
                           Tìm bác sĩ
                        </Form.Label>
                        <Col sm='8'>
                           <Select
                              value={selectedDoctor}
                              options={listDoctor}
                              className='manage-specialty-select'
                              onChange={handleChangeSelectDoctor}
                           />
                        </Col>
                     </Form.Group>
                  </Form>
                  <button className='main-btn find-doctor-btn mx-auto' onClick={findDoctor}>
                     Tìm bác sĩ
                  </button>
               </div>
            </div>
         </div>

         <div className='list-doctor-container'>
            {displayDoctor &&
               displayDoctor.map((item) => {
                  return (
                     <Row className='list-doctor'>
                        <Col sm='5'>
                           <img src={doctor1} alt='' className='img-doctor' />
                        </Col>
                        <Col className='info-doctor' sm='7'>
                           <div className='info-doctor-name'>Bác sĩ {item.fullName}</div>
                           <div className='info-doctor-specialty'>
                              <div className='info-doctor-specialty__title'>Chuyên khoa</div>
                              <div className='info-doctor-specialty__content'>
                                 Khoa gây mê hồi sức
                              </div>
                           </div>
                           <div className='info-doctor-language'>
                              <div className='info-doctor-language__title'>Chuyên khoa</div>
                              <div className='info-doctor-language__content'>
                                 {item.specialtyName}
                              </div>
                           </div>
                           <Accordion alwaysOpen>
                              <Accordion.Item eventKey='0'>
                                 <Accordion.Header className='accordion-title'>
                                    Chứng chỉ
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>Trường Y</p>
                                    <ul>
                                       {/* {certificate?.map(item)} */}
                                       <li>
                                          2010 - 2016: Bác sĩ đa khoa, trường Đại học Y Hà Nội, Hà
                                          Nội, Việt Nam
                                       </li>
                                       <li>
                                          2010 - 2016: Bác sĩ đa khoa, trường Đại học Y Hà Nội, Hà
                                          Nội, Việt Nam
                                       </li>
                                    </ul>

                                    <p className='training'>Đào tạo nâng cao</p>
                                    <ul>
                                       <li>
                                          2010 - 2016: Bác sĩ đa khoa, trường Đại học Y Hà Nội, Hà
                                          Nội, Việt Nam
                                       </li>
                                       <li>
                                          2010 - 2016: Bác sĩ đa khoa, trường Đại học Y Hà Nội, Hà
                                          Nội, Việt Nam
                                       </li>
                                    </ul>
                                 </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey='1'>
                                 <Accordion.Header>Accordion Item #2</Accordion.Header>
                                 <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Accordion>

                           <button
                              className='main-btn find-doctor-btn mx-auto mt-4'
                              onClick={findDoctor}
                           >
                              Đặt lịch khám bệnh
                           </button>
                        </Col>
                     </Row>
                  )
               })}
         </div>

         <Footer />
      </>
   )
}

export default FindDoctor
