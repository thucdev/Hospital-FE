import MarkdownIt from "markdown-it"
import { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useSelector } from "react-redux"
import Select from "react-select"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { createNewSpecialtyTranslation, getSpecialtyById } from "../../../../services/userService"
import FlagIcon from "../../../../styles/FlagIcon"
import "./SpecialtyTranslation.scss"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const SpecialtyTranslation = () => {
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

   const [title, setTitle] = useState("")
   const [editor, setEditor] = useState({
      descriptionMarkdown: "",
      descriptionHTML: "",
   })
   const { descriptionMarkdown, descriptionHTML } = editor

   const [toggleContents, setToggleContents] = useState("Language")
   const [selectedLanguage, setSelectedLanguage] = useState()
   const [languages] = useState([
      { code: "vn", title: "Việt Nam" },
      { code: "us", title: "English" },
   ])

   const handleOnchangeInput = (e) => {
      setTitle(e.target.value)
   }

   function handleEditorChange({ html, text }) {
      setEditor({
         descriptionMarkdown: text,
         descriptionHTML: html,
      })
   }

   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [listSpecialty, setListSpecialty] = useState([])
   const fetchAllSpecialty = () => {
      const listObj = []
      allSpecialties.map((item) => {
         let obj = {}
         obj.label = item.title
         obj.value = item.id
         listObj.push(obj)
      })
      setListSpecialty(listObj)
   }

   useEffect(() => {
      fetchAllSpecialty()
   }, [])

   const handleChangeSelect = async (selectedOption) => {
      //get detail specialty
      try {
         let res = await getSpecialtyById(selectedOption.value)
         if (res?.data) {
            setSelectedSpecialty({
               label: res.data.title,
               value: res.data.id,
            })
            setEditor({
               descriptionMarkdown: res.data.descriptionMarkdown,
               descriptionHTML: res.data.descriptionHTML,
            })
         }
      } catch (error) {
         console.log("", error)
      }
   }

   const handleSaveTranslation = async () => {
      try {
         const data = await createNewSpecialtyTranslation({
            specialtyId: selectedSpecialty.value,
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
            setSelectedSpecialty({
               value: "",
               label: "",
            })
            toast.success("Create specialty successfully!")
         } else {
            toast.error("Create fail!")
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
                        <FormattedMessage id='manage.specialty.select-specialty' />
                     </label>
                     <Select
                        value={selectedSpecialty}
                        onChange={handleChangeSelect}
                        options={listSpecialty}
                        placeholder='Select specialty'
                        className='translate-specialty-select'
                     />
                  </div>
                  <div className='form-group my-2'>
                     <label htmlFor='' className='text-title'>
                        <FormattedMessage id='manage.specialty.specialty-name' />
                     </label>
                     <input
                        type='text'
                        className='form-control form-control-sm title-translate-specialty'
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
                  <button className='btn btn-warning mt-3' onClick={handleSaveTranslation}>
                     <FormattedMessage id='menu.save' />
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default SpecialtyTranslation
