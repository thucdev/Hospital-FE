import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./BookingAppointment.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createAppointment, getSpecialtyById } from "../../services/userService"
import moment from "moment"

function BookingAppointment() {
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

   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   console.log("allSpecialties", allSpecialties)

   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [title, setTitle] = useState(selectedSpecialty.label)

   const [listSpecialty, setListSpecialty] = useState([])
   const fetchAllSpecialty = () => {
      const listObj = []
      const listObjEn = []
      allSpecialties?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         // objEn.value = item.translationData.value
         listObj.push(obj)
         // listObjEn.push(objEn)
      })
      setListSpecialty(listObj)
      // setListSpecialtyEn(listObjEn)
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
         let formattedDate = moment.utc(startDate).format("DD/MM/YYYY")
         let res = await createAppointment({
            ...bookingData,
            timeBooked: chosenHour,
            dateBooked: formattedDate,
            specialtyId: selectedSpecialty.value,
         })
         if (res.success) {
            toast.success("You have orderd an appointment successfully!")
         } else {
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
            <h1>Đặt Lịch Khám Bệnh</h1>
         </div>
         <div className='booking-body'>
            <p>
               Để đảm bảo an toàn cho khách hàng đến khám chữa bệnh ngoại trú và nội trú trong thời
               điểm hiện nay, quý khách vui lòng thực hiện khai báo y tế trước khi đến khám bằng
               cách nhấp chuột{" "}
               <a href='https://docs.google.com/forms/d/e/1FAIpQLSdv9anK6U6_Fd2paTdRSrVpQn0I7sEe3xYPNQw6ugzTklt_dg/viewform'>
                  TẠI ĐÂY
               </a>
            </p>

            <div className='booking-form'>
               <div className='booking-form-title'>Đặt lịch hẹn</div>
               <div className='booking-form-body'>
                  <Form>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3' className='form-label'>
                           Họ tên của bạn
                        </Form.Label>
                        <Col sm='9'>
                           <Form.Control
                              type='text'
                              placeholder='Họ tên đầy đủ...'
                              name='fullName'
                              value={fullName}
                              onChange={onChangeBookingFormInput}
                           />
                        </Col>
                     </Form.Group>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3' className='form-label'>
                           Số điện thoại
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
                           Chọn chuyên khoa
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
                           Chọn ngày
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
                              <option>Chọn giờ khám</option>
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
                           Vấn đề của bạn
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
                  <button className='btn-save-booking' onClick={handleOrderAppointment}>
                     Đặt lịch
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default BookingAppointment
