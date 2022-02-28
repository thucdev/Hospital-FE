import moment from "moment"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FormattedMessage, useIntl } from "react-intl"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { deleteDoctor, paginationDoctor } from "../../../../services/userService"
import { getAllDoctor } from "../../../../store/apiRequest/apiUser"
import PaginationDoctor from "./PaginationDoctor"

const ManageDoctor = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const intl = useIntl()

   const totalDoctor = useSelector((state) => state.userReducer.totalDoctor)
   const [checked, setChecked] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])
   const [listDoctor, setListDoctor] = useState([])
   const [loading, setLoading] = useState(false)
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
      console.log("res delete", res)
      if (res?.data?.success) {
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
               <h3>
                  <FormattedMessage id='manage.doctor.list-doctor' />
               </h3>

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
                           <FormattedMessage id='menu.select-all' />
                        </label>
                     </div>

                     <select id='disabledSelect' className='form-select form-select-sm'>
                        <option>
                           --
                           {intl.formatMessage({
                              id: "menu.action",
                           })}
                           --
                        </option>
                        <option value='delete'>
                           {intl.formatMessage({
                              id: "menu.delete",
                           })}
                        </option>
                     </select>

                     <button className='btn btn-primary btn-sm'>
                        <FormattedMessage id='menu.perform' />
                     </button>
                  </div>
                  <button
                     className='btn btn-primary btn-add mt-4'
                     onClick={() => navigate("/system/create-doctor")}
                  >
                     <FormattedMessage id='menu.create' />
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
                        ID
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.doctor.doctors-name' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.doctor.address' />
                     </th>

                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.doctor.phoneNumber' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.doctor.updated' />
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
                                          to='/system/'
                                          // state={{ specialtyId: item.value }}
                                          className='btn btn-link'
                                       >
                                          <FormattedMessage id='menu.edit' />
                                       </Link>

                                       <p
                                          className='btn btn-link'
                                          onClick={handleDeleteDoctor.bind(this, item.id)}
                                       >
                                          <FormattedMessage id='menu.delete' />
                                       </p>
                                    </td>
                                 </tr>
                              )
                           })
                        ) : (
                           <tr>
                              <td colSpan='7' className='text-center'>
                                 <FormattedMessage id='manage.doctor.no-doctor' />

                                 <Link to='/system/create-doctor'>
                                    <FormattedMessage id='manage.doctor.create-doctor' />
                                 </Link>
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
