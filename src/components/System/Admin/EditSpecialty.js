import { useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'
import { DropdownButton, Dropdown, Form } from 'react-bootstrap'
import FlagIcon from '../../../styles/FlagIcon'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './EditSpecialty.scss'
import {
    createNewSpecialty,
    // getAllSpecialties,
    getSpecialtyById,
} from '../../../services/userService'
import Base64 from '../../../utils/Base64'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

const EditSpecialty = () => {
    const location = useLocation()
    const { specialtyId } = location.state
    const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)

    const [title, setTitle] = useState('')
    const [imgBase64, setImgBase64] = useState('')

    const [editor, setEditor] = useState({
        descriptionMarkdown: '',
        descriptionHTML: '',
    })
    const { descriptionMarkdown, descriptionHTML } = editor

    const [toggleContents, setToggleContents] = useState('Language')
    const [selectedLanguage, setSelectedLanguage] = useState()
    const [languages] = useState([
        { code: 'vn', title: 'Việt Nam' },
        { code: 'us', title: 'English' },
    ])

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
    const [selectedSpecialty, setSelectedSpecialty] = useState({
        value: '',
        label: '',
    })
    const [listSpecialty, setListSpecialty] = useState([])
    console.log('list spec', listSpecialty)
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
        let data = fetchAllSpecialty()
        console.log('data', data)
        if (!data || data.length === 0) {
            console.log('ko co data')
        } else {
        }
        console.log('lan 1')
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
            console.log('', error)
        }
    }

    const handleSaveSpecialty = async () => {
        //update

        // try {
        //     const data = await createNewSpecialty({
        //         img: imgBase64,
        //         title,
        //         descriptionMarkdown: editor.descriptionMarkdown,
        //         descriptionHTML: editor.descriptionHTML,
        //         code: selectedLanguage,
        //     })
        //     if (data.success) {
        //         setTitle('')
        //         setEditor({
        //             descriptionMarkdown: '',
        //             descriptionHTML: '',
        //         })
        //         setToggleContents('Language')
        //         toast.success('Create specialty successfully!')
        //     } else {
        //         toast.error('Create fail!')
        //     }
        // } catch (error) {
        //     console.log('', error)
        // }
        console.log('chua lam')
    }
    const navigate = useNavigate()

    const onAdd = () => {
        navigate('/system/add-new-specialty')
    }
    const onTranslate = () => {
        navigate('/system/translate-specialty')
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
                                onChange={handleChangeSelect}
                                options={listSpecialty}
                                // options={listObj}
                                // placeholder={
                                //     <FormattedMessage id='admin.manage-doctor.select-doctor' />
                                // }
                                className='manage-specialty-select'
                            />
                        </div>

                        <Dropdown
                            onSelect={(eventKey) => {
                                const { code, title } = languages.find(
                                    ({ code }) => eventKey === code
                                )

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
                        <div className=' form-group my-2 p-0 '>
                            <label htmlFor='' className='text-title'>
                                Tải ảnh chuyên khoa
                            </label>
                            <input
                                type='file'
                                className='form-control-file manage-specialty-file-upload'
                                onChange={handleOnchangeImg}
                            />
                        </div>
                        <div className=' form-group my-2  p-0'>
                            <button className='btn btn-success btn-sm mt-4 btn-add' onClick={onAdd}>
                                Add New
                            </button>
                        </div>
                        <div className=' form-group my-2  p-0'>
                            <button
                                className='btn btn-success btn-sm mt-4 btn-add'
                                onClick={onTranslate}
                            >
                                Translate
                            </button>
                        </div>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '400px' }}
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
