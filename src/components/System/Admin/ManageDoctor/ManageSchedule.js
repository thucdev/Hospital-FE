import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { deleteDoctor, getAllSchedules } from "../../../../services/userService"
import { getAllDoctor } from "../../../../store/apiRequest/apiUser"

const ManageSchedule = () => {
   const dispatch = useDispatch()
   const intl = useIntl()

   const [allSchedules, setAllSchedules] = useState([])
   const [checked, setChecked] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])

   const fetchAllSchedule = async () => {
      let res = await getAllSchedules()
      const listId = []
      res.data?.map((item) => {
         listId.push(item.id)
      })
      setAllSchedules(res.data)

      setIdCheckAll(listId)
   }

   useEffect(() => {
      fetchAllSchedule()
   }, [])

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
               <h3>
                  <FormattedMessage id='manage.schedule.list-schedule' />
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
                        <FormattedMessage id='manage.schedule.appointment-date' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.schedule.time' />
                     </th>

                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.schedule.patient-name' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.schedule.reason' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.schedule.doctor' />
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
                              <td className='ps-3'>{item.timeBooked}</td>
                              <td>{item.patientData.fullName}</td>
                              <td>{item.reason}</td>
                              <td>{item.doctorData.fullName}</td>
                              <td className='w-20'>
                                 <Link
                                    to='/system/edit-specialty'
                                    state={{ specialtyId: item.value }}
                                    className='btn btn-link'
                                 >
                                    <FormattedMessage id='menu.edit' />
                                 </Link>
                                 <p
                                    href=''
                                    className='btn btn-link'
                                    data-id='{{this._id}}'
                                    data-bs-toggle='modal'
                                    data-bs-target='#delete-course'
                                    onClick={handleDeleteDoctor.bind(this, item.value)}
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
                           <FormattedMessage id='manage.schedule.no-schedule' />
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   )
}

export default ManageSchedule
