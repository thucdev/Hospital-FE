import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./AskDoctor.scss"
import { FormattedMessage } from "react-intl"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { Form, Col, Row, Button } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createQuestion } from "../../services/userService"
import moment from "moment"
import { useNavigate, userNavigate } from "react-router-dom"
import Footer from "../Footer/Footer"

function AskDoctor() {
   const [askingData, setAskingData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      reason: "",
   })
   const { fullName, email, phoneNumber, reason } = askingData

   const onChangeBookingFormInput = (event) => {
      setAskingData((prev) => {
         return {
            ...prev,
            [event.target.name]: event.target.value,
         }
      })
   }

   const handleOrderAppointment = async () => {
      try {
         let res = await createQuestion({ askingData })
         if (res.success) {
            toast.success("Send your question success")
         } else {
            toast.error("Send your question fail")
         }
      } catch (error) {
         console.log("er", error)
      }
   }

   return (
      <>
         <Header />
         <div className='bg-header bg-ask-doctor'>
            <h1>Hỏi Bác Sĩ</h1>
         </div>
         <div className='booking-body'>
            <div className='booking-form'>
               <div className='booking-form-title'>Gửi câu hỏi cho chúng tôi</div>
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
                  <button
                     className='main-btn mx-auto btn-question'
                     onClick={handleOrderAppointment}
                  >
                     Gửi câu hỏi
                  </button>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default AskDoctor
