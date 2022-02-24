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
            <h1>
               <FormattedMessage id='find-doctor.title' />
            </h1>
         </div>

         <div className='find-doctor-body'>
            <div className='find-doctor-form'>
               <div className='find-doctor-form-body'>
                  <Form>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3'>
                           <FormattedMessage id='find-doctor.select-specialty' />
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
                           <FormattedMessage id='find-doctor.find-btn' />
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
                     <FormattedMessage id='find-doctor.find-btn' />
                  </button>
               </div>
            </div>
         </div>

         <div className='list-doctor-container'>
            {displayDoctor &&
               displayDoctor.map((item, index) => {
                  return (
                     <Row className='list-doctor' key={index}>
                        <Col sm='5'>
                           <div
                              className='bg-image img-doctor'
                              style={{ backgroundImage: `url(${item.image})` }}
                           ></div>
                        </Col>
                        <Col className='info-doctor' sm='7'>
                           <div className='info-doctor-name'>Bác sĩ {item.fullName}</div>
                           <div className='info-doctor-specialty'>
                              <div className='info-doctor-specialty__title'>Chuyên khoa</div>
                              <div className='info-doctor-specialty__content'>
                                 {item.specialtyName}
                              </div>
                           </div>
                           <div className='info-doctor-language'>
                              <div className='info-doctor-language__title'>Ngôn ngữ</div>
                              <div className='info-doctor-language__content'>{item.language}</div>
                           </div>
                           <Accordion alwaysOpen>
                              <Accordion.Item eventKey='0'>
                                 <Accordion.Header className='accordion-title'>
                                    Chứng chỉ
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>Trường Y</p>
                                    <ul>
                                       {item.doctor_infoData.degree?.map((degree, index) => {
                                          return <li key={index}>{degree}</li>
                                       })}
                                    </ul>

                                    <p className='training'>Đào tạo nâng cao</p>
                                    <ul>
                                       <ul>
                                          {item.doctor_infoData.certificate?.map(
                                             (certificate, index) => {
                                                return <li key={index}>{certificate}</li>
                                             }
                                          )}
                                       </ul>
                                    </ul>
                                 </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey='1'>
                                 <Accordion.Header>Kinh nghiệm</Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>Kinh nghiệm</p>
                                    <ul>
                                       {item.doctor_infoData.experience?.map(
                                          (experience, index) => {
                                             return <li key={index}>{experience}</li>
                                          }
                                       )}
                                    </ul>
                                 </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey='2'>
                                 <Accordion.Header>Hội viên</Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>Hội viên</p>
                                    <ul>
                                       {item.doctor_infoData.member?.map((member, index) => {
                                          return <li key={index}>{member}</li>
                                       })}
                                    </ul>
                                 </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey='3'>
                                 <Accordion.Header>Lĩnh vực chuyên sâu</Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>Lĩnh vực chuyên sâu</p>
                                    <ul>
                                       {item.doctor_infoData.field?.map((field, index) => {
                                          return <li key={index}>{field}</li>
                                       })}
                                    </ul>
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
