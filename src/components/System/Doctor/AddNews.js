import MarkdownIt from "markdown-it"
import { useRef, useState } from "react"
// import "./AddNews.scss"
import { Dropdown } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { createNews } from "../../../services/userService"
import { getAllSpecialties } from "../../../store/apiRequest/apiUser"
import FlagIcon from "../../../styles/FlagIcon"
import Base64 from "../../../utils/Base64"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const AddNews = () => {
   const dispatch = useDispatch()
   const ref = useRef()

   const [title, setTitle] = useState("")
   const [imgBase64, setImgBase64] = useState("")

   const [editor, setEditor] = useState({
      descriptionMarkdown: "",
      descriptionHTML: "",
   })
   const { descriptionMarkdown } = editor

   const [toggleContents, setToggleContents] = useState("Language")
   const [selectedLanguage, setSelectedLanguage] = useState()
   console.log("selectedLanguage", selectedLanguage)
   const [languages] = useState([
      { code: "vn", title: "Việt Nam" },
      { code: "us", title: "English" },
   ])

   const handleOnchangeInput = (event) => {
      setTitle(event.target.value)
   }

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
   const handleSaveNews = async () => {
      try {
         const data = await createNews({
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
            ref.current.value = ""
            dispatch(getAllSpecialties())

            toast.success("Create News successfully!")
         } else {
            toast.error(`${data.message}`)
         }
      } catch (error) {
         console.log("", error)
      }
   }

   return (
      <>
         <div className='manage-specialty-container'>
            <div className='add-new-specialty row'>
               <div className='col-6 form-group my-2'>
                  <label htmlFor='' className='text-title'>
                     <FormattedMessage id='manage.news.title' />
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     value={title}
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
                  className='col-2 dropdown-btn '
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
               <div className='col-3 form-group my-2 ps-2 upload-photo'>
                  <label htmlFor='' className='text-title'>
                     <FormattedMessage id='manage.news.img' />
                  </label>
                  <input
                     type='file'
                     className='form-control-file'
                     ref={ref}
                     onChange={handleOnchangeImg}
                  />
               </div>
               <div className='col-1 form-group my-2  '></div>
               <div className='col-12'>
                  <MdEditor
                     style={{ height: "400px" }}
                     renderHTML={(text) => mdParser.render(text)}
                     onChange={handleEditorChange}
                     value={descriptionMarkdown}
                  />
               </div>
               <div className='col-12'>
                  <button className='btn btn-warning mt-3' onClick={handleSaveNews}>
                     <FormattedMessage id='menu.save' />
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default AddNews
