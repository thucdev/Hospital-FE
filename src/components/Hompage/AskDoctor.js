import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import { FormattedMessage } from "react-intl"
import { toast } from "react-toastify"
import { createQuestion } from "../../services/userService"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./AskDoctor.scss"

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
            setAskingData({
               fullName: "",
               email: "",
               phoneNumber: "",
               reason: "",
            })
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
            <h1>
               <FormattedMessage id='inquiry.title' />
            </h1>
         </div>
         <div className='booking-body'>
            <div className='booking-form'>
               <div className='booking-form-title'>
                  <FormattedMessage id='inquiry.title' />
               </div>
               <div className='booking-form-body'>
                  <Form>
                     <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='3' className='form-label'>
                           <FormattedMessage id='inquiry.full-name' />
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
                           <FormattedMessage id='inquiry.phone-number' />
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
                           <FormattedMessage id='inquiry.description' />
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
                     <FormattedMessage id='inquiry.submit' />
                  </button>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default AskDoctor
