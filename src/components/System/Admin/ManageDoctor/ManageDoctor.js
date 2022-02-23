import { useState, useEffect } from "react"
import "react-markdown-editor-lite/lib/index.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "./ManageSpecialty.scss"
import { deleteDoctor, paginationDoctor } from "../../../../services/userService"
import { getAllDoctor } from "../../../../store/apiRequest/apiUser"
import { useSelector } from "react-redux"
import moment from "moment"
import PaginationDoctor from "./PaginationDoctor"
import { Spinner } from "react-bootstrap"

const ManageDoctor = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // const allDoctors = useSelector((state) => state.userReducer.allDoctor)
   const totalDoctor = useSelector((state) => state.userReducer.totalDoctor)
   console.log("totalDoctor", totalDoctor)
   const [checked, setChecked] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])
   const [listDoctor, setListDoctor] = useState([])
   const [loading, setLoading] = useState(false)
   // const [listDoctors, setListDoctors] = useState([])
   console.log("idCheckAll", idCheckAll)
   const [pagination, setPagination] = useState({
      page: 0,
      limit: 6,
      total: totalDoctor,
   })

   const [filter, setFilter] = useState({
      limit: 6,
      page: 0,
   })

   const fetchAllDoctor = async () => {
      setLoading(true)
      let listDoctor = await paginationDoctor(filter)
      console.log("listDoctor", listDoctor)
      setPagination({
         ...pagination,
         total: listDoctor.total,
      })

      const listId = []
      listDoctor?.data.map((item) => {
         listId.push(item.id)
      })
      setListDoctor(listDoctor.data)
      setIdCheckAll(listId)

      setLoading(false)
   }

   const handlePageChange = (newPage) => {
      setFilter({
         ...filter,
         page: newPage,
      })
      setPagination({
         ...pagination,
         page: newPage,
      })
   }

   useEffect(() => {
      fetchAllDoctor()
   }, [filter])

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
                  <button
                     className='btn btn-primary btn-add mt-4'
                     onClick={() => navigate("/system/create-doctor")}
                  >
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
                  {loading === true && (
                     <div className='d-flex justify-content-center mt-2'>
                        <Spinner animation='border' variant='info' />
                     </div>
                  )}

                  {loading === false && (
                     <>
                        {listDoctor?.length > 0 ? (
                           listDoctor.map((item, index) => {
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
                                    <td>{item.fullName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{moment.utc(item.updatedAt).format("DD/MM/YYYY")}</td>
                                    <td className='w-20'>
                                       <Link
                                          to='/system/edit-specialty'
                                          state={{ specialtyId: item.value }}
                                          className='btn btn-link'
                                       >
                                          Sửa
                                       </Link>

                                       <Link
                                          to='/system/edit-specialty'
                                          className='btn btn-link'
                                          onClick={handleDeleteDoctor.bind(this, item.value)}
                                       >
                                          Xoá
                                       </Link>
                                    </td>
                                 </tr>
                              )
                           })
                        ) : (
                           <tr>
                              <td colSpan='7' className='text-center'>
                                 Chưa có bác sĩ nào được tạo.
                                 <Link to='/system/create-doctor'> Tạo bác sĩ</Link>
                              </td>
                           </tr>
                        )}
                     </>
                  )}
               </tbody>
            </table>
         </div>
         <div className='pagination-number my-4'>
            <PaginationDoctor pagination={pagination} onPageChange={handlePageChange} />
         </div>
      </>
   )
}

export default ManageDoctor
