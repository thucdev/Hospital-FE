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
import { FormattedMessage, useIntl } from "react-intl"

const ManageScheduleDoctor = () => {
   const intl = useIntl()

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

   useEffect(() => {
      fetchAllSchedule()
   }, [])

   const navigate = useNavigate()
   const onAdd = () => {
      navigate("/system/create-doctor")
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
                        <FormattedMessage id='manage.schedule.phoneNumber' />
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
                                 <button className='btn btn-primary' onClick={onAdd}>
                                    <FormattedMessage id='manage.schedule.done' />
                                 </button>
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

export default ManageScheduleDoctor
