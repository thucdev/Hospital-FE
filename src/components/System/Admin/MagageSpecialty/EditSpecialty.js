import MarkdownIt from "markdown-it"
import { useEffect, useRef, useState } from "react"
import { Dropdown } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Select from "react-select"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getSpecialtyById, updateSpecialty } from "../../../../services/userService"
import FlagIcon from "../../../../styles/FlagIcon"
import Base64 from "../../../../utils/Base64"
import "./EditSpecialty.scss"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const EditSpecialty = () => {
   const ref = useRef()
   const navigate = useNavigate()

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
            ref.current.value = ""
            setToggleContents("Language")
            toast.success("Update specialty successfully!")
         } else {
            toast.error("Update fail!")
         }
      } catch (error) {
         console.log("", error)
      }
   }

   return (
      <>
         <div className='manage-specialty-container'>
            <div>
               <div className='add-new-specialty'>
                  <div className=' form-group my-2'>
                     <label htmlFor='' className='text-title'>
                        <FormattedMessage id='manage.specialty.specialty-name' />
                     </label>
                     <Select
                        value={selectedSpecialty}
                        options={listSpecialty}
                        className='manage-specialty-select'
                     />

                     <input
                        type='text'
                        className='manage-specialty-input form-control '
                        value={title}
                        ref={target}
                        onChange={handleOnchangeInput}
                     />
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
                        <FormattedMessage id='manage.specialty.img' />
                     </label>
                     <input
                        type='file'
                        id='file'
                        ref={ref}
                        className='form-control-file manage-specialty-file-upload hidden'
                        onChange={handleOnchangeImg}
                     />
                  </div>

                  <div className=' form-group my-2  p-0'>
                     <button
                        className='btn btn-success  mt-5 btn-add'
                        onClick={() => navigate("/system/translate-specialty")}
                     >
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
                     <FormattedMessage id='menu.save' />
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default EditSpecialty
