import { useEffect, useState } from "react"
import { Accordion, Col, Form, Row } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { getSpecialtyById } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./FindDoctor.scss"

function FindDoctor() {
   const navigate = useNavigate()

   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const allDoctors = useSelector((state) => state.userReducer.allDoctor)

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
         listSpec.push(obj)
      })
      setListSpecialty(listSpec)
   }

   const handleChangeSelectSpecialty = async (selectedOption) => {
      try {
         let res = await getSpecialtyById(selectedOption.value)
         console.log("specialty finddocto", res)
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
                                    <FormattedMessage id='find-doctor.qualification' />
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>
                                       <FormattedMessage id='find-doctor.medical-school' />
                                    </p>
                                    <ul>
                                       {item.doctor_infoData.degree?.map((degree, index) => {
                                          return <li key={index}>{degree}</li>
                                       })}
                                    </ul>

                                    <p className='training'>
                                       <FormattedMessage id='find-doctor.advanced-training' />
                                    </p>
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
                                 <Accordion.Header>
                                    <FormattedMessage id='find-doctor.experience' />
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>
                                       <FormattedMessage id='find-doctor.experience' />
                                    </p>
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
                                 <Accordion.Header>
                                    <FormattedMessage id='find-doctor.membership' />
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>
                                       <FormattedMessage id='find-doctor.membership' />
                                    </p>
                                    <ul>
                                       {item.doctor_infoData.member?.map((member, index) => {
                                          return <li key={index}>{member}</li>
                                       })}
                                    </ul>
                                 </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey='3'>
                                 <Accordion.Header>
                                    <FormattedMessage id='find-doctor.field' />
                                 </Accordion.Header>
                                 <Accordion.Body>
                                    <p className='school'>
                                       <FormattedMessage id='find-doctor.field' />
                                    </p>
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
                              <FormattedMessage id='find-doctor.order' />
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
