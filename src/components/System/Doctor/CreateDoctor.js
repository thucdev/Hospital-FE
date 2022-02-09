import { useState, useEffect } from "react"

import Select from "react-select"
import { useSelector } from "react-redux"
import Base64 from "../../../utils/Base64"
import "./CreateDoctor.scss"
import { getSpecialtyById, createDoctor } from "../../../services/userService"

function CreateDoctor() {
    const allSpecialties = useSelector((state) => state.userReducer.allSpecialty)
    const [selectedSpecialty, setSelectedSpecialty] = useState({
        value: "",
        label: "",
    })
    const [infoFiled, setInfoFiled] = useState({
        email: "",
        password: "",
        fullName: "",
        language: "",
        experience: "",
        member: "",
        certificate: "",
        degree: "",
        filed: "",
    })
    const { email, password, fullName, experience, member, language, certificate, degree, filed } =
        infoFiled

    const [infosArray, setInfosArray] = useState({
        experience: [],
        member: [],
        // language: [],
        certificate: [],
        degree: [],
        filed: [],
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

    const [imgBase64, setImgBase64] = useState("")

    const handleOnchangeImg = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await Base64.getBase64(file)
            setImgBase64(base64)
        }
    }

    console.log("selectedSpecialty", selectedSpecialty)
    const handleOnchageInput = (event) => {
        setInfoFiled((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    const handleClickAdd = (name) => {
        setInfosArray((prev) => {
            return {
                ...prev,
                [name]: [...infosArray[name], infoFiled[name]],
            }
        })
        setInfoFiled({
            [name]: "",
        })
    }

    const handleChangeSelect = async (selectedOption) => {
        try {
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
    const handleAddNew = async () => {
        try {
            console.log("infoFiled.email,", infoFiled.email)
            console.log("infoFiled,", infoFiled)
            let data = await createDoctor({
                email: infoFiled.email,
                password: infoFiled.password,
                fullName: infoFiled.fullName,
                language: infoFiled.language,
                imgBase64,
                specialtyId: selectedSpecialty.value,
                ...infosArray,
            })
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
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='' className='my-1'>
                            Mật khẩu
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={handleOnchageInput}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='' className='my-1 '>
                            Họ và tên bác sĩ
                        </label>
                        <input
                            type='text'
                            className='form-control mb-2'
                            name='fullName'
                            value={fullName}
                            placeholder='Enter full name'
                            onChange={handleOnchageInput}
                        />
                    </div>
                    <div className='form-group group-doctor-info'>
                        <div className='px-3'>
                            <label htmlFor='' className='my-1'>
                                Kinh nghiệm
                            </label>
                            <ul>
                                {infosArray["experience"]?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>

                            <input
                                value={experience}
                                type='text'
                                className='form-control mt-2'
                                name='experience'
                                placeholder='Enter experience'
                                onChange={handleOnchageInput}
                            />
                            <button
                                onClick={() => handleClickAdd("experience")}
                                class='btn btn-success my-2'
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                    <div className='form-group group-doctor-info'>
                        <div className='px-3'>
                            <label htmlFor='' className='my-1'>
                                Hội viên
                            </label>
                            <ul>
                                {infosArray["member"]?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>

                            <input
                                value={member}
                                type='text'
                                className='form-control mt-2'
                                name='member'
                                placeholder='Enter member'
                                onChange={handleOnchageInput}
                            />
                            <button
                                onClick={() => handleClickAdd("member")}
                                class='btn btn-success my-2'
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>

                <div className='col-6'>
                    <div className='form-group'>
                        <label htmlFor='' className='text-title my-1'>
                            Tên chuyên khoa
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
                            ngôn ngữ
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='language'
                            value={language}
                            placeholder='Tiếng Việt, Tiếng Anh'
                            onChange={handleOnchageInput}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='' className='text-title my-1 '>
                            Tải ảnh bác sĩ
                        </label>
                        <br />
                        <input
                            type='file'
                            className='form-control-file my-2'
                            onChange={handleOnchangeImg}
                        />
                    </div>
                    <div className='form-group group-doctor-info'>
                        <div className='px-3'>
                            <label htmlFor='' className='my-1'>
                                Tên Chứng chỉ Trường y
                            </label>
                            <ul>
                                {infosArray["certificate"]?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>

                            <input
                                value={certificate}
                                type='text'
                                className='form-control mt-2'
                                name='certificate'
                                placeholder='Enter certificate'
                                onChange={handleOnchageInput}
                            />
                            <button
                                onClick={() => handleClickAdd("certificate")}
                                class='btn btn-success my-2'
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                    <div className='form-group group-doctor-info'>
                        <div className='px-3'>
                            <label htmlFor='' className='my-1'>
                                Bằng cấp chuyên môn
                            </label>
                            <ul>
                                {infosArray["degree"]?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>

                            <input
                                value={degree}
                                type='text'
                                className='form-control mt-2'
                                name='degree'
                                placeholder='Enter degree'
                                onChange={handleOnchageInput}
                            />
                            <button
                                onClick={() => handleClickAdd("degree")}
                                class='btn btn-success my-2'
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
                <div className=' row '>
                    <div className=' form-group group-doctor-info col-12 group-doctor-info-filed '>
                        <div className='px-3 '>
                            <label htmlFor='' className='my-1'>
                                Lĩnh vực chuyên sâu
                            </label>
                            <ul>
                                {infosArray["filed"]?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>

                            <input
                                value={filed}
                                type='text'
                                className='form-control mt-2'
                                name='filed'
                                placeholder='Enter filed'
                                onChange={handleOnchageInput}
                            />
                            <button
                                onClick={() => handleClickAdd("filed")}
                                class='btn btn-success my-2'
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleAddNew} class='btn btn-warning my-2'>
                Thêm mới
            </button>
        </div>
    )
}

export default CreateDoctor
