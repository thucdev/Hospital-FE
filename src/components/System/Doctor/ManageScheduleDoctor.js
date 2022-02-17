import { useState, useEffect } from "react"
import "react-markdown-editor-lite/lib/index.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "./ManageSpecialty.scss"
import { deleteDoctor, getAllSchedulesByDoctor } from "../../../services/userService"
import { getAllDoctor } from "../../../store/apiRequest/apiUser"
import { useSelector } from "react-redux"
import moment from "moment"

const ManageScheduleDoctor = () => {
   const dispatch = useDispatch()
   const doctorId = useSelector((state) => state.authReducer.login.user?.userId)

   const [allSchedules, setAllSchedules] = useState([])
   const [checked, setChecked] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])
   const [listDoctor, setListDoctor] = useState([])
   const fetchAllSchedule = async () => {
      let res = await getAllSchedulesByDoctor({ doctorId })
      console.log("allshc", res.data)
      // const listObj = []
      const listId = []
      res.data?.map((item) => {
         listId.push(item.id)
      })
      setAllSchedules(res.data)

      // setListDoctor(listObj)
      setIdCheckAll(listId)
   }

   useEffect(async () => {
      fetchAllSchedule()
   }, [])

   const navigate = useNavigate()
   const onAdd = () => {
      navigate("/system/create-doctor")
   }

   // const handleDeleteDoctor = async (specialtyId) => {
   //    let res = await deleteDoctor(specialtyId)
   //    if (res?.success) {
   //       toast.success("Delete doctor success")
   //       dispatch(getAllDoctor())
   //    } else {
   //       toast.error("Delete doctor fail")
   //    }
   // }

   const handleCheckInput = (id) => {
      setChecked((prev) => {
         const isChecked = checked.includes(id)
         if (isChecked) {
            return checked.filter((item) => item !== id)
         } else {
            return [...prev, id]
         }
      })
   }

   const handleCheckAll = (event) => {
      if (event.target.checked) {
         setChecked(idCheckAll)
      } else {
         setChecked([])
      }
   }

   return (
      <>
         <div className='mt-4 manage-specialty'>
            <div>
               <h3>Danh sách Lịch khám bệnh</h3>
               {/* {{#if deleteCount}} */}
               <a href='/me/trash/courses'>
                  {/* Thùng rác */}
                  {/* ({{ deleteCount }}) */}
               </a>
               <div className='btn-action'>
                  <div className='mt-4 manage-specialty-action'>
                     <div className=' form-check'>
                        <input
                           type='checkbox'
                           className='form-check-input'
                           id='checkbox-all'
                           onChange={handleCheckAll}
                        />
                        <label className='form-check-label' htmlFor='checkbox-all'>
                           Chọn tất cả
                        </label>
                     </div>

                     <select id='disabledSelect' className='form-select form-select-sm'>
                        <option>--Hành động--</option>
                        <option value='delete'>Xoá</option>
                     </select>
                     <button className='btn btn-primary btn-sm'>Thực hiện</button>
                  </div>
               </div>
            </div>

            <table className='table mt-4'>
               <thead>
                  <tr>
                     <th scope='col' colSpan=''>
                        #
                     </th>
                     <th scope='col' colSpan=''>
                        STT
                     </th>
                     <th scope='col' colSpan=''>
                        Ngày hẹn
                        {/* {{{sortable 'name' _sort}}} */}
                     </th>
                     <th scope='col' colSpan=''>
                        Thời gian
                     </th>

                     <th scope='col' colSpan=''>
                        Tên bệnh nhân
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                     <th scope='col' colSpan=''>
                        Lý do khám
                     </th>
                     <th scope='col' colSpan=''>
                        Số điện thoại
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {allSchedules?.length > 0 ? (
                     allSchedules.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>
                                 <div className='mb-3 form-check'>
                                    <input
                                       type='checkbox'
                                       className='form-check-input checkbox-item'
                                       checked={checked.includes(item.id)}
                                       onChange={() => handleCheckInput(item.id)}
                                    />
                                 </div>
                              </td>

                              <td>{index + 1}</td>
                              <td>{item.dateBooked}</td>
                              <td className='ps-4'>{item.timeBooked}</td>
                              <td>{item.patientData.fullName}</td>
                              <td>{item.reason}</td>
                              <td>{item.patientData.phoneNumber}</td>
                              <td className='w-20'>
                                 {/* <Link
                                    to='/system/edit-specialty'
                                    state={{ specialtyId: item.value }}
                                    className='btn btn-link'
                                 >
                                    Sửa
                                 </Link>
                                 <p
                                    href=''
                                    className='btn btn-link'
                                    data-id='{{this._id}}'
                                    data-bs-toggle='modal'
                                    data-bs-target='#delete-course'
                                    onClick={handleDeleteDoctor.bind(this, item.value)}
                                 >
                                    Xoá
                                 </p> */}

                                 <button className='btn btn-primary' onClick={onAdd}>
                                    Đã khám xong
                                 </button>
                              </td>
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td colSpan='7' className='text-center'>
                           Chưa có lịch khám nào được hẹn.
                           {/* <Link to='/system/create-doctor'>Tạo bác sĩ</Link> */}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   )
}

export default ManageScheduleDoctor
