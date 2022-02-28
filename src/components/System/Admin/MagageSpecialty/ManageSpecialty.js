import moment from "moment"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { deleteSpecialty } from "../../../../services/userService"
import { getAllSpecialties } from "../../../../store/apiRequest/apiUser"
import "./ManageSpecialty.scss"

const ManageSpecialty = () => {
   const intl = useIntl()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const [checked, setChecked] = useState([])
   const [listSpecialty, setListSpecialty] = useState([])
   const [idCheckAll, setIdCheckAll] = useState([])

   const fetchAllSpecialty = () => {
      const listObj = []
      const listId = []
      allSpecialties?.map((item) => {
         let obj = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         obj.lastEdit = moment.utc(item.updatedAt).format("DD/MM/YYYY")
         listObj.push(obj)
         listId.push(item.id)
      })
      setListSpecialty(listObj)
      setIdCheckAll(listId)
   }

   useEffect(() => {
      fetchAllSpecialty()
   }, [allSpecialties])

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
               <h3>
                  <FormattedMessage id='manage.specialty.list-specialty' />
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
                     onClick={() => navigate("/system/add-new-specialty")}
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
                        <FormattedMessage id='manage.specialty.specialty-name' />
                     </th>
                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.specialty.translation' />
                     </th>

                     <th scope='col' colSpan=''>
                        <FormattedMessage id='manage.specialty.updated' />
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
                                    <FormattedMessage id='menu.edit' />
                                 </Link>
                                 <p
                                    className='btn btn-link'
                                    onClick={handleDeleteSpecialty.bind(this, item.value)}
                                 >
                                    <FormattedMessage id='menu.delete' />
                                 </p>
                              </td>
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td colSpan='5' className='text-center'>
                           <FormattedMessage id='manage.specialty.no-specialty' />
                           <Link to='/system/add-new-specialty'>
                              <FormattedMessage id='manage.specialty.create-specialty' />
                           </Link>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </>
   )
}

export default ManageSpecialty
