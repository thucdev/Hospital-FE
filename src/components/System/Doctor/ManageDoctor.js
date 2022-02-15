import { useState, useEffect } from "react"
import "react-markdown-editor-lite/lib/index.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "./ManageSpecialty.scss"
import { deleteSpecialty } from "../../../services/userService"
import { getAllSpecialties } from "../../../store/apiRequest/apiUser"
import { useSelector } from "react-redux"
import moment from "moment"

const ManageDoctor = () => {
   const dispatch = useDispatch()
   const allDoctors = useSelector((state) => state.userReducer.allDoctor)
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   console.log("allDoctors", allDoctors)
   const [checked, setChecked] = useState([])
   const [listSpecialty, setListSpecialty] = useState([])
   const [listSpecialtyEn, setListSpecialtyEn] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])

   const fetchAllSpecialty = () => {
      const listObj = []
      const listObjEn = []
      const listId = []
      allDoctors?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.fullName
         obj.labelEn = item.experience
         obj.value = item.id
         obj.lastEdit = moment.utc(item.updatedAt).format("DD/MM/YYYY")
         // objEn.value = item.translationData.value
         listObj.push(obj)
         listId.push(item.id)
         // listObjEn.push(objEn)
      })
      allSpecialties?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.fullName
         obj.labelEn = item.experience
         obj.value = item.id
         obj.lastEdit = moment.utc(item.updatedAt).format("DD/MM/YYYY")
         // objEn.value = item.translationData.value
         listObj.push(obj)
         listId.push(item.id)
         // listObjEn.push(objEn)
      })
      setListSpecialty(listObj)
      setListSpecialtyEn(listObjEn)
      setIdCheckAll(listId)
   }

   useEffect(() => {
      fetchAllSpecialty()
   }, [allDoctors])

   const navigate = useNavigate()
   const onAdd = () => {
      navigate("/system/create-doctor")
   }

   const handleDeleteSpecialty = async (specialtyId) => {
      let res = await deleteSpecialty(specialtyId)
      if (res?.success) {
         toast.success("Delete specialty success")
         dispatch(getAllSpecialties())
      } else {
         toast.error("Delete specialty fail")
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
                        Thuộc chuyên khoa
                     </th>

                     <th scope='col' colSpan=''>
                        Sửa đổi gần nhất
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {listSpecialty?.length > 0 ? (
                     listSpecialty.map((item, index) => {
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
                              <td>{item.labelEn}</td>

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
                                    onClick={handleDeleteSpecialty.bind(this, item.value)}
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
