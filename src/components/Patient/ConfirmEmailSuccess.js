import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { verifyBookingAppointment } from "../../services/userService"
import Header from "../Header/Header"

const ConfirmEmailSuccess = () => {
   const [verify, setVerify] = useState({
      isVerify: false,
      isLoading: true,
   })
   const [searchParams, setSearchParams] = useSearchParams()
   let doctorId = searchParams.get("doctorId")
   let token = searchParams.get("token")

   const verifyAppointment = async () => {
      let res = await verifyBookingAppointment({
         token: token,
         doctorId: doctorId,
      })
      if (res?.success) {
         setVerify({
            isVerify: true,
            isLoading: false,
         })
      } else {
         setVerify({
            isVerify: false,
            isLoading: false,
         })
      }
   }
   useEffect(() => {
      verifyAppointment()
   }, [])

   return (
      <>
         <Header />

         {verify.isLoading === true ? (
            <div className='confirm-content text-center mt-5'>Đang lấy dữ liệu từ server...</div>
         ) : (
            <div>
               {verify.isVerify === true ? (
                  <div>
                     <div className='confirm-content text-center mt-5'>
                        Bạn đã đặt lịch khám bệnh thành công. Vui lòng đến khám đúng giờ đã hẹn. Xin
                        cảm ơn!
                     </div>
                  </div>
               ) : (
                  <div className='title confirm-content text-center mt-4'>
                     Lịch hẹn không tồn tại hoặc đã được xác nhận!
                  </div>
               )}
            </div>
         )}
      </>
   )
}

export default ConfirmEmailSuccess
