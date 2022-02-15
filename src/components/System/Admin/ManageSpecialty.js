import { useState, useEffect } from "react"
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import Select from "react-select"
import { DropdownButton, Dropdown, Form } from "react-bootstrap"
import FlagIcon from "../../../styles/FlagIcon"
import { Link, useNavigate } from "react-router-dom"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./ManageSpecialty.scss"
import {
   createNewSpecialty,
   // getAllSpecialties,
   getSpecialtyById,
} from "../../../services/userService"
import Base64 from "../../../utils/Base64"
import { useSelector } from "react-redux"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const ManageSpecialty = () => {
   const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

   console.log("allSpecialties", allSpecialties)

   const [title, setTitle] = useState("")
   const [imgBase64, setImgBase64] = useState("")

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

   // const handleOnchangeImg = async (event) => {
   //     let data = event.target.files
   //     let file = data[0]
   //     if (file) {
   //         let base64 = await Base64.getBase64(file)
   //         setImgBase64(base64)
   //     }
   // }

   // function handleEditorChange({ html, text }) {
   //     setEditor({
   //         descriptionMarkdown: text,
   //         descriptionHTML: html,
   //     })
   // }

   //////////////////////
   const [selectedSpecialty, setSelectedSpecialty] = useState({
      value: "",
      label: "",
   })
   const [listSpecialty, setListSpecialty] = useState([])
   const [listSpecialtyEn, setListSpecialtyEn] = useState([])
   const fetchAllSpecialty = () => {
      const listObj = []
      const listObjEn = []
      allSpecialties?.map((item) => {
         let obj = {}
         let objEn = {}
         obj.label = item.title
         obj.labelEn = item.translationData.title
         obj.value = item.id
         // objEn.value = item.translationData.value
         listObj.push(obj)
         // listObjEn.push(objEn)
      })
      setListSpecialty(listObj)
      setListSpecialtyEn(listObjEn)
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

   const navigate = useNavigate()

   const onAdd = () => {
      navigate("/system/add-new-specialty")
   }

   return (
      <>
         <div className='mt-4 manage-specialty'>
            <div>
               <h3>Danh sách chuyên khoa</h3>
               {/* {{#if deleteCount}} */}
               <a href='/me/trash/courses'>
                  Thùng rác
                  {/* ({{ deleteCount }}) */}
               </a>
               <div className='btn-action'>
                  <div className='mt-4 manage-specialty-action'>
                     <div className=' form-check'>
                        <input type='checkbox' className='form-check-input' id='checkbox-all' />
                        <label className='form-check-label' for='checkbox-all'>
                           Chọn tất cả
                        </label>
                     </div>

                     <select id='disabledSelect' className='form-select form-select-sm'>
                        <option>--Hành động--</option>
                        <option value='delete'>Xoá</option>
                     </select>
                     <button className='btn btn-primary btn-sm'>Thực hiện</button>
                  </div>
                  <button className='btn btn-primary btn-add mt-4' onClick={onAdd}>
                     Thêm mới
                  </button>
               </div>
            </div>

            <table className='table mt-4'>
               <thead>
                  <tr>
                     <th scope='col' colspan=''>
                        #
                     </th>
                     <th scope='col' colspan=''>
                        ID
                     </th>
                     <th scope='col' colspan=''>
                        Tên chuyên khoa
                        {/* {{{sortable 'name' _sort}}} */}
                     </th>
                     <th scope='col' colspan=''>
                        Bài dịch
                     </th>

                     <th scope='col' colspan=''>
                        Thời gian tạo
                        {/* {{{sortable 'createdAt' _sort}}} */}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {listSpecialty.map((item, index) => {
                     return (
                        <tr key={index}>
                           <td>
                              <div className='mb-3 form-check'>
                                 <input
                                    type='checkbox'
                                    className='form-check-input checkbox-item'
                                    name='courseIds[]'
                                    value='{{this._id}}'
                                 />
                              </div>
                           </td>

                           <td>{index + 1}</td>
                           <td>{item.label}</td>
                           <td>{item.labelEn}</td>

                           <td>20/10/2020</td>
                           <td className='w-20'>
                              <Link
                                 to='/system/edit-specialty'
                                 state={{ specialtyId: item.value }}
                                 className='btn btn-link'
                              >
                                 Sửa
                              </Link>
                              <a
                                 href=''
                                 className='btn btn-link'
                                 data-id='{{this._id}}'
                                 data-bs-toggle='modal'
                                 data-bs-target='#delete-course'
                              >
                                 Xoá
                              </a>
                           </td>
                        </tr>
                     )
                  })}

                  <td colspan='5' className='text-center'>
                     {/* Chưa có chuyên khoa nào được tạo. */}
                     {/* <Link to='/system/add-new-specialty'>Tạo chuyên khoa</Link> */}
                     {/* <Link to='/system/add-new-specialty'>Tạo chuyên khoa</Link> */}
                  </td>
                  {/* {{/each}} */}
               </tbody>
            </table>
         </div>
      </>
   )
}

export default ManageSpecialty
