import _ from "lodash"
import { useEffect, useRef, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { toast } from "react-toastify"
import { checkIsEmailExist, createDoctor, getSpecialtyById } from "../../../../services/userService"
import { getAllDoctor } from "../../../../store/apiRequest/apiUser"
import Base64 from "../../../../utils/Base64"
import "./CreateDoctor.scss"

function CreateDoctor() {
   const ref = useRef()
   const dispatch = useDispatch()
   const intl = useIntl()
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [infoFiled, setInfoFiled] = useState({
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      language: "",
      experience: "",
      member: "",
      certificate: "",
      degree: "",
      field: "",
   })
   const {
      email,
      password,
      fullName,
      language,
      phoneNumber,
      address,
      experience,
      member,
      certificate,
      degree,
      field,
   } = infoFiled

   const [infosArray, setInfosArray] = useState({
      experience: [],
      member: [],
      certificate: [],
      degree: [],
      field: [],
   })
   const [listSpecialty, setListSpecialty] = useState([])
   const fetchAllSpecialty = () => {
      const listObj = []
      allSpecialties?.map((item) => {
         let obj = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         listObj.push(obj)
      })
      setListSpecialty(listObj)
   }
   useEffect(() => {
      fetchAllSpecialty()
   }, [])

   const [imgBase64, setImgBase64] = useState("")

   const handleOnchangeImg = async (event) => {
      let data = event.target.files
      let file = data[0]
      if (file) {
         let base64 = await Base64.getBase64(file)
         setImgBase64(base64)
      }
   }

   const handleOnchageInput = (event) => {
      setInfoFiled((prev) => ({
         ...prev,
         [event.target.name]: event.target.value,
      }))
   }
   const handleClickAdd = (name) => {
      if (!infoFiled[name]) {
         alert("plesase fill")
         return
      } else {
         setInfosArray((prev) => {
            return {
               ...prev,
               [name]: [...infosArray[name], infoFiled[name]],
            }
         })

         setInfoFiled({
            [name]: "",
         })

         if (email || password || fullName || language) {
            getDataFromLocal()
         }
      }
   }

   const getDataFromLocal = () => {
      let compacted = _.pickBy(infoFiled)
      let data = JSON.stringify({ ...compacted })
      if (data) {
         //add to existing key in local storage
         if (localStorage.getItem("infoFiled")) {
            let getValueExist = JSON.parse(localStorage.getItem("infoFiled"))
            let value = JSON.stringify({ ...getValueExist, ...compacted })

            localStorage.setItem("infoFiled", value)
         } else {
            localStorage.setItem("infoFiled", data)
         }
      }
   }

   const handleChangeSelect = async (selectedOption) => {
      try {
         getDataFromLocal()

         let res = await getSpecialtyById(selectedOption.value)
         if (res?.data) {
            setSelectedSpecialty({
               label: res.data.title,
               value: res.data.id,
            })
         }
      } catch (error) {
         console.log("", error)
      }
   }

   const handleOnBlurEmail = async () => {
      let res = await checkIsEmailExist({ email })
      if (res.success) {
         toast.error(`${res.message}!`)
      }
   }

   const handleAddNew = async () => {
      try {
         let info = localStorage.getItem("infoFiled")
         let infoDoctor = JSON.parse(info)

         let res = await createDoctor({
            email: infoDoctor.email,
            password: infoDoctor.password,
            fullName: infoDoctor.fullName,
            address: infoDoctor.address,
            phoneNumber: infoDoctor.phoneNumber,
            language: infoDoctor.language,
            image: imgBase64,
            specialtyId: selectedSpecialty.value,
            ...infosArray,
         })
         console.log("res", res)

         if (res.data.success) {
            toast.success("Create doctor successfully!")

            setInfoFiled({
               email: "",
               password: "",
               fullName: "",
               phoneNumber: "",
               address: "",
               language: "",
               experience: "",
               member: "",
               certificate: "",
               degree: "",
               field: "",
            })

            setInfosArray({
               experience: [],
               member: [],
               certificate: [],
               degree: [],
               field: [],
            })
            setSelectedSpecialty({
               label: "",
               value: "",
            })
            localStorage.removeItem("infoFiled")
            dispatch(getAllDoctor())
            ref.current.value = ""
         } else {
            toast.error(`${res.data.message}!`)
         }
      } catch (error) {
         console.log("e", error)
      }
   }

   return (
      <div className='create-doctor'>
         <div className='row '>
            <div className='col-6'>
               <div className='form-group'>
                  <label htmlFor='' className='my-1'>
                     Email
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     name='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={handleOnchageInput}
                     onBlur={handleOnBlurEmail}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='my-1'>
                     <FormattedMessage id='menu.doctor.password' />
                  </label>
                  <input
                     type='password'
                     className='form-control'
                     name='password'
                     placeholder={intl.formatMessage({
                        id: "menu.placeholder.password",
                     })}
                     value={password}
                     onChange={handleOnchageInput}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='my-1 '>
                     <FormattedMessage id='menu.doctor.fullName' />
                  </label>
                  <input
                     type='text'
                     className='form-control mb-2'
                     name='fullName'
                     value={fullName}
                     placeholder={intl.formatMessage({
                        id: "menu.placeholder.fullName",
                     })}
                     onChange={handleOnchageInput}
                  />
               </div>
               <div className='form-group group-doctor-info'>
                  <div className='px-3'>
                     <label htmlFor='' className='my-1'>
                        <FormattedMessage id='menu.doctor.experience' />
                     </label>
                     <ul>
                        {infosArray["experience"]?.map((item, index) => {
                           return <li key={index}>{item}</li>
                        })}
                     </ul>

                     <input
                        type='text'
                        className='form-control mt-2'
                        name='experience'
                        value={experience}
                        placeholder={intl.formatMessage({
                           id: "menu.placeholder.experience",
                        })}
                        onChange={handleOnchageInput}
                     />
                     <button
                        onClick={() => handleClickAdd("experience")}
                        class='btn btn-success my-2'
                     >
                        <FormattedMessage id='menu.add' />
                     </button>
                  </div>
               </div>
               <div className='form-group group-doctor-info'>
                  <div className='px-3'>
                     <label htmlFor='' className='my-1'>
                        <FormattedMessage id='menu.doctor.membership' />
                     </label>
                     <ul>
                        {infosArray["member"]?.map((item, index) => {
                           return <li key={index}>{item}</li>
                        })}
                     </ul>

                     <input
                        type='text'
                        className='form-control mt-2'
                        name='member'
                        value={member}
                        placeholder={intl.formatMessage({
                           id: "menu.placeholder.membership",
                        })}
                        onChange={handleOnchageInput}
                     />
                     <button onClick={() => handleClickAdd("member")} class='btn btn-success my-2'>
                        <FormattedMessage id='menu.add' />
                     </button>
                  </div>
               </div>
               <div className='form-group group-doctor-info'>
                  <div className='px-3'>
                     <label htmlFor='' className='my-1'>
                        <FormattedMessage id='menu.doctor.field' />
                     </label>
                     <ul>
                        {infosArray["field"]?.map((item, index) => {
                           return <li key={index}>{item}</li>
                        })}
                     </ul>

                     <input
                        type='text'
                        className='form-control mt-2'
                        name='field'
                        value={field}
                        placeholder={intl.formatMessage({
                           id: "menu.placeholder.field",
                        })}
                        onChange={handleOnchageInput}
                     />
                     <button onClick={() => handleClickAdd("field")} class='btn btn-success my-2'>
                        <FormattedMessage id='menu.add' />
                     </button>
                  </div>
               </div>
            </div>

            <div className='col-6'>
               <div className='form-group'>
                  <label htmlFor='' className='text-title my-1'>
                     <FormattedMessage id='menu.doctor.specialty' />
                  </label>
                  <Select
                     value={selectedSpecialty}
                     options={listSpecialty}
                     className='manage-specialty-select'
                     onChange={handleChangeSelect}
                     // onFocus={handleFocusSelect}
                     // ref={target}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='my-1'>
                     <FormattedMessage id='menu.doctor.phoneNumber' />
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     name='phoneNumber'
                     placeholder={intl.formatMessage({
                        id: "menu.placeholder.phoneNumber",
                     })}
                     value={phoneNumber}
                     onChange={handleOnchageInput}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='my-1'>
                     <FormattedMessage id='menu.address' />
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     name='address'
                     placeholder={intl.formatMessage({
                        id: "menu.placeholder.address",
                     })}
                     value={address}
                     onChange={handleOnchageInput}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='my-1'>
                     <FormattedMessage id='menu.doctor.language' />
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     name='language'
                     value={language}
                     placeholder={intl.formatMessage({
                        id: "menu.placeholder.language",
                     })}
                     onChange={handleOnchageInput}
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='' className='text-title my-1 '>
                     <FormattedMessage id='menu.doctor.avatar' />
                  </label>
                  <br />
                  <input
                     type='file'
                     ref={ref}
                     className='form-control-file my-2'
                     onChange={handleOnchangeImg}
                  />
               </div>
               <div className='form-group group-doctor-info'>
                  <div className='px-3'>
                     <label htmlFor='' className='my-1'>
                        <FormattedMessage id='menu.doctor.qualifications' />
                     </label>
                     <ul>
                        {infosArray["certificate"]?.map((item, index) => {
                           return <li key={index}>{item}</li>
                        })}
                     </ul>

                     <input
                        type='text'
                        className='form-control mt-2'
                        name='certificate'
                        value={certificate}
                        placeholder={intl.formatMessage({
                           id: "menu.placeholder.qualifications",
                        })}
                        onChange={handleOnchageInput}
                     />
                     <button
                        onClick={() => handleClickAdd("certificate")}
                        class='btn btn-success my-2'
                     >
                        <FormattedMessage id='menu.add' />
                     </button>
                  </div>
               </div>
               <div className='form-group group-doctor-info'>
                  <div className='px-3'>
                     <label htmlFor='' className='my-1'>
                        <FormattedMessage id='menu.doctor.degree' />
                     </label>
                     <ul>
                        {infosArray["degree"]?.map((item, index) => {
                           return <li key={index}>{item}</li>
                        })}
                     </ul>

                     <input
                        type='text'
                        className='form-control mt-2'
                        name='degree'
                        value={degree}
                        placeholder={intl.formatMessage({
                           id: "menu.placeholder.degree",
                        })}
                        onChange={handleOnchageInput}
                     />
                     <button onClick={() => handleClickAdd("degree")} class='btn btn-success my-2'>
                        <FormattedMessage id='menu.add' />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <button onClick={handleAddNew} class='btn btn-warning my-2'>
            <FormattedMessage id='menu.create' />
         </button>
      </div>
   )
}

export default CreateDoctor
