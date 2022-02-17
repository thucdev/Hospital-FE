import { useState, useEffect } from "react"
import "react-markdown-editor-lite/lib/index.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "./ManageSpecialty.scss"
import { deleteDoctor } from "../../../../services/userService"
import { getAllDoctor } from "../../../../store/apiRequest/apiUser"
import { useSelector } from "react-redux"
import moment from "moment"

const ManageDoctor = () => {
   const dispatch = useDispatch()
   const allDoctors = useSelector((state) => state.userReducer.allDoctor)
   const [checked, setChecked] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])
   const [listDoctor, setListDoctor] = useState([])
   const fetchAllDoctor = () => {
      const listObj = []
      const listId = []
      allDoctors?.map((item) => {
         let obj = {}
         obj.label = item.fullName
         obj.labelEn = item.experience
         obj.value = item.id
         obj.lastEdit = moment.utc(item.updatedAt).format("DD/MM/YYYY")
         listObj.push(obj)
         listId.push(item.id)
      })

      setListDoctor(listObj)
      setIdCheckAll(listId)
   }

   useEffect(() => {
      fetchAllDoctor()
   }, [allDoctors])

   const navigate = useNavigate()
   const onAdd = () => {
      navigate("/system/create-doctor")
   }

   const handleDeleteDoctor = async (specialtyId) => {
      let res = await deleteDoctor(specialtyId)
      if (res?.success) {
         toast.success("Delete doctor success")
         dispatch(getAllDoctor())
      } else {
         toast.error("Delete doctor fail")
      }
   }

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
               <h3>Danh sách Bác sĩ</h3>
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
                  <button className='btn btn-primary btn-add mt-4' onClick={onAdd}>
                     Thêm mới
                  </button>
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
                        Tên Bác sĩ
                        {/* {{{sortable 'name' _sort}}} */}
                     </th>
                     <th scope='col' colSpan=''>
                        Địa chỉ
                     </th>

                     <th scope='col' colSpan=''>
                        Số điện thoại
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                     <th scope='col' colSpan=''>
                        Sửa đổi gần nhất
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {listDoctor?.length > 0 ? (
                     listDoctor.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>
                                 <div className='mb-3 form-check'>
                                    <input
                                       type='checkbox'
                                       className='form-check-input checkbox-item'
                                       checked={checked.includes(item.value)}
                                       onChange={() => handleCheckInput(item.value)}
                                    />
                                 </div>
                              </td>

                              <td>{index + 1}</td>
                              <td>{item.label}</td>
                              <td>{item.address}</td>
                              <td>{item.phoneNumber}</td>

                              <td>{item.lastEdit}</td>
                              <td className='w-20'>
                                 <Link
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
                                 </p>
                              </td>
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td colSpan='5' className='text-center'>
                           Chưa có bác sĩ nào được tạo.
                           <Link to='/system/create-doctor'>Tạo bác sĩ</Link>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   )
}

export default ManageDoctor
