import moment from "moment"
import { useEffect, useState } from "react"
import { Col, Form, Row, Spinner } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FormattedMessage, useIntl } from "react-intl"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { toast } from "react-toastify"
import { createAppointment, getSpecialtyById } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./BookingAppointment.scss"

function BookingAppointment() {
   const navigate = useNavigate()
   const intl = useIntl()
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

   const [loading, setLoading] = useState(false)
   const [bookingData, setBookingData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      reason: "",
   })
   const { fullName, email, phoneNumber, reason } = bookingData

   const [chosenHour, setChosenHour] = useState("")

   const onChangeBookingFormInput = (event) => {
      setBookingData((prev) => {
         return {
            ...prev,
            [event.target.name]: event.target.value,
         }
      })
   }

   const [startDate, setStartDate] = useState(new Date())

   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })

   const [listSpecialty, setListSpecialty] = useState([])
   const fetchAllSpecialty = () => {
      const listObj = []
      allSpecialties?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         listObj.push(obj)
      })
      setListSpecialty(listObj)
   }

   const handleChangeSelect = async (selectedOption) => {
      try {
         let res = await getSpecialtyById(selectedOption.value)
         if (res?.data) {
            setSelectedSpecialty({
               label: res.data.title,
               value: res.data.id,
            })
         }
      } catch (error) {
         console.log("", error)
      }
   }

   useEffect(() => {
      fetchAllSpecialty()
   }, [])

   const handleSelectTime = (event) => {
      setChosenHour(event.target.value)
   }

   const handleOrderAppointment = async () => {
      try {
         setLoading(true)

         let formattedDate = moment.utc(startDate).format("DD/MM/YYYY")
         let res = await createAppointment({
            ...bookingData,
            timeBooked: chosenHour,
            dateBooked: formattedDate,
            specialtyId: selectedSpecialty.value,
         })
         if (res.data.success) {
            toast.success("You have orderd an appointment successfully!")
            setLoading(false)
            navigate("/confirm-email")
         } else {
            setLoading(false)
            toast.error("Order an appointment fail!")
         }
      } catch (error) {
         console.log("er", error)
      }
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-booking-appointment'>
            <h1>
               <FormattedMessage id='find-doctor.order' />
            </h1>
         </div>
         {loading === true && (
            <>
               <p className='mb-5 d-flex justify-content-center mt-5'>
                  <FormattedMessage id='booking.wait-minutes' />
               </p>
               <div className='d-flex justify-content-center mt-5 mb-5'>
                  <Spinner animation='border' variant='info' />
               </div>
            </>
         )}
         {loading === false && (
            <div className='booking-body'>
               <p>
                  <FormattedMessage id='booking.test-covid' />

                  <a href='https://docs.google.com/forms/d/e/1FAIpQLSdv9anK6U6_Fd2paTdRSrVpQn0I7sEe3xYPNQw6ugzTklt_dg/viewform'>
                     <FormattedMessage id='booking.here' />
                  </a>
               </p>

               <div className='booking-form'>
                  <div className='booking-form-title'>
                     <FormattedMessage id='find-doctor.order' />
                  </div>
                  <div className='booking-form-body'>
                     <Form>
                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3' className='form-label'>
                              <FormattedMessage id='booking.full-name' />
                           </Form.Label>
                           <Col sm='9'>
                              <Form.Control
                                 type='text'
                                 placeholder={intl.formatMessage({
                                    id: "booking.full-name",
                                 })}
                                 name='fullName'
                                 value={fullName}
                                 onChange={onChangeBookingFormInput}
                              />
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3' className='form-label'>
                              <FormattedMessage id='booking.phone-number' />
                           </Form.Label>
                           <Col sm='9'>
                              <Form.Control
                                 type='phone-number'
                                 placeholder='03892145...'
                                 name='phoneNumber'
                                 value={phoneNumber}
                                 onChange={onChangeBookingFormInput}
                              />
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3' className='form-label'>
                              Email
                           </Form.Label>
                           <Col sm='9'>
                              <Form.Control
                                 type='text'
                                 placeholder='patient@gmail.com...'
                                 name='email'
                                 value={email}
                                 onChange={onChangeBookingFormInput}
                              />
                           </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3'>
                              <FormattedMessage id='booking.select-specialty' />
                           </Form.Label>
                           <Col sm='9'>
                              {/* <Form.Control type='text' placeholder='Password' /> */}
                              <Select
                                 value={selectedSpecialty}
                                 options={listSpecialty}
                                 className='manage-specialty-select'
                                 onChange={handleChangeSelect}
                                 // onFocus={handleFocusSelect}
                                 // ref={target}
                              />
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3' className='form-label'>
                              <FormattedMessage id='booking.select-day' />
                           </Form.Label>
                           <Col sm='6'>
                              <DatePicker
                                 selected={startDate}
                                 dateFormat='dd/MM/yyyy'
                                 onChange={(date) => setStartDate(date)}
                                 minDate={new Date()}
                                 className='form-control'
                              />
                           </Col>
                           <Col sm='3'>
                              <Form.Select onChange={handleSelectTime}>
                                 <option>
                                    {intl.formatMessage({
                                       id: "booking.select-time",
                                    })}
                                 </option>
                                 <option value='T1'>7h</option>
                                 <option value='T2'>8h</option>
                                 <option value='T3'>9h</option>
                                 <option value='T4'>10h</option>
                                 <option value='T5'>11h</option>
                                 <option value='T6'>13h</option>
                                 <option value='T7'>14h</option>
                                 <option value='T8'>15h</option>
                                 <option value='T9'>16h</option>
                                 <option value='T10'>17h</option>
                              </Form.Select>
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4'>
                           <Form.Label column sm='3' className='form-label'>
                              <FormattedMessage id='booking.reason' />
                           </Form.Label>
                           <Col sm='9'>
                              <Form.Control
                                 as='textarea'
                                 rows={3}
                                 name='reason'
                                 value={reason}
                                 onChange={onChangeBookingFormInput}
                              />
                           </Col>
                        </Form.Group>
                     </Form>
                     <button className='btn-save-booking main-btn' onClick={handleOrderAppointment}>
                        <FormattedMessage id='booking.booking' />
                     </button>
                  </div>
               </div>
            </div>
         )}
         <Footer />
      </>
   )
}

export default BookingAppointment
