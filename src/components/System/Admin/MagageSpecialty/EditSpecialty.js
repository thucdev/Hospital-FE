import { useState, useEffect, useRef } from "react"
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import Select from "react-select"
import { DropdownButton, Dropdown, Form, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap"
import FlagIcon from "../../../../styles/FlagIcon"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./EditSpecialty.scss"
import {
   createNewSpecialty,
   getSpecialtyById,
   updateSpecialty,
} from "../../../../services/userService"
import Base64 from "../../../../utils/Base64"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const EditSpecialty = () => {
   const [show, setShow] = useState(false)
   const [toggleContents, setToggleContents] = useState("Language")
   const [selectedLanguage, setSelectedLanguage] = useState()
   const [languages] = useState([
      { code: "vn", title: "Việt Nam" },
      { code: "us", title: "English" },
   ])
   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [title, setTitle] = useState(selectedSpecialty.label)

   const [listSpecialty, setListSpecialty] = useState([])

   const target = useRef(null)
   const location = useLocation()
   const { specialtyId } = location.state

   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
   const [editor, setEditor] = useState({
      descriptionMarkdown: "",
      descriptionHTML: "",
   })
   const { descriptionMarkdown, descriptionHTML } = editor

   const [imgBase64, setImgBase64] = useState("")

   const handleOnchangeImg = async (event) => {
      let data = event.target.files
      let file = data[0]
      if (file) {
         let base64 = await Base64.getBase64(file)
         setImgBase64(base64)
      }
   }

   function handleEditorChange({ html, text }) {
      setEditor({
         descriptionMarkdown: text,
         descriptionHTML: html,
      })
   }

   //////////////////////

   // const fetchAllSpecialty = () => {
   //     const listObj = []
   //     allSpecialties?.map((item) => {
   //         let obj = {}
   //         obj.label = item.title
   //         obj.value = item.id
   //         listObj.push(obj)
   //     })
   //     setListSpecialty(listObj)
   // }

   const [detailSpecialty, setDetailSpecialty] = useState([])
   const getDetailSpecialty = async () => {
      try {
         let res = await getSpecialtyById(specialtyId)
         setDetailSpecialty(res)
      } catch (error) {
         console.log("", error)
      }
   }

   const setValueSelect = () => {
      try {
         if (detailSpecialty?.data) {
            if (selectedLanguage === "vn") {
               setSelectedSpecialty({
                  label: detailSpecialty.data.title,
                  value: detailSpecialty.data.id,
               })
               setEditor({
                  descriptionMarkdown: detailSpecialty.data.descriptionMarkdown,
                  descriptionHTML: detailSpecialty.data.descriptionHTML,
               })
            } else {
               setSelectedSpecialty({
                  label: detailSpecialty.data.translationData.title,
                  value: detailSpecialty.data.translationData.id,
               })
               setEditor({
                  descriptionMarkdown: detailSpecialty.data.translationData.descriptionMarkdown,
                  descriptionHTML: detailSpecialty.data.translationData.descriptionHTML,
               })
            }
         }
         setTitle(selectedSpecialty.label)
      } catch (error) {
         console.log("err", error)
      }
   }

   useEffect(() => {
      getDetailSpecialty()
   }, [])
   useEffect(() => {
      setValueSelect()
   }, [selectedLanguage])

   const handleFocusInput = () => {
      if (!selectedLanguage) {
         setShow(!show)
      }
   }

   const handleOnchangeInput = (e) => {
      setTitle(e.target.value)
   }
   const handleSaveSpecialty = async () => {
      try {
         const data = await updateSpecialty({
            specialtyId,
            img: imgBase64,
            title,
            descriptionMarkdown: editor.descriptionMarkdown,
            descriptionHTML: editor.descriptionHTML,
            code: selectedLanguage,
         })
         if (data.success) {
            setTitle("")
            setEditor({
               descriptionMarkdown: "",
               descriptionHTML: "",
            })
            setToggleContents("Language")
            toast.success("Update specialty successfully!")
         } else {
            toast.error("Update fail!")
         }
      } catch (error) {
         console.log("", error)
      }
   }
   const navigate = useNavigate()

   const onAdd = () => {
      navigate("/system/add-new-specialty")
   }
   const onTranslate = () => {
      navigate("/system/translate-specialty")
   }

   return (
      <>
         <div className='manage-specialty-container'>
            <div>
               <div className='add-new-specialty'>
                  <div className=' form-group my-2'>
                     <label htmlFor='' className='text-title'>
                        Tên chuyên khoa
                     </label>
                     <Select
                        value={selectedSpecialty}
                        options={listSpecialty}
                        className='manage-specialty-select'
                        // onChange={handleChangeSelect}
                        // onFocus={handleFocusSelect}
                        // ref={target}
                     />
                     {/* <OverlayTrigger
                                placement='top'
                                overlay={<Tooltip>Please select language first!</Tooltip>}
                            > */}
                     <input
                        type='text'
                        className='manage-specialty-input form-control '
                        value={title}
                        ref={target}
                        // onFocus={
                        //     selectedSpecialty?.label?.length === 0
                        //         ? handleFocusInput
                        //         : ''
                        // }
                        onChange={handleOnchangeInput}
                     />
                     {/* </OverlayTrigger> */}
                  </div>

                  <Dropdown
                     onSelect={(eventKey) => {
                        const { code, title } = languages.find(({ code }) => eventKey === code)

                        setSelectedLanguage(eventKey)
                        setToggleContents(
                           <>
                              <FlagIcon code={code} /> {title}
                           </>
                        )
                     }}
                     className=' dropdown-btn '
                  >
                     <Dropdown.Toggle
                        variant='outline-info'
                        id='dropdown-flags'
                        className='text-left '
                        size='sm'
                     >
                        {toggleContents}
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        {languages.map(({ code, title }) => (
                           <Dropdown.Item key={code} eventKey={code}>
                              <FlagIcon code={code} /> {title}
                           </Dropdown.Item>
                        ))}
                     </Dropdown.Menu>
                  </Dropdown>
                  <div className=' form-group my-2 px-2 upload-photo'>
                     <label htmlFor='file' className='text-title'>
                        Tải ảnh chuyên khoa
                     </label>
                     <input
                        type='file'
                        id='file'
                        className='form-control-file manage-specialty-file-upload hidden'
                        onChange={handleOnchangeImg}
                     />
                  </div>
                  {/* <div className=' form-group my-2  p-0'>
                     <button className='btn btn-success btn-sm mt-4 btn-add' onClick={onAdd}>
                        Add New
                     </button>
                  </div> */}
                  <div className=' form-group my-2  p-0'>
                     <button className='btn btn-success  mt-5 btn-add' onClick={onTranslate}>
                        Translate
                     </button>
                  </div>
               </div>
               <div className='col-12'>
                  <MdEditor
                     style={{ height: "400px" }}
                     renderHTML={(text) => mdParser.render(text)}
                     onChange={handleEditorChange}
                     value={descriptionMarkdown}
                  />
               </div>
               <div className='col-12'>
                  <button className='btn btn-warning mt-3' onClick={handleSaveSpecialty}>
                     Save
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default EditSpecialty
