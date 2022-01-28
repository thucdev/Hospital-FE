import { Routes, Route } from 'react-router-dom'
import Auth from './Auth/views/Auth'
import Homepage from './components/Hompage/Homepage'
import './App.scss'
import { System } from './routes/System'
import ManageDoctor from './components/System/Admin/ManageDoctor'
import ManageSchedule from './components/System/Doctor/ManageSchedule'
import ManageSpecialty from './components/System/Admin/ManageSpecialty'
import AddSpecialty from './components/System/Admin/AddSpecialty'
import { ToastContainer } from 'react-toastify'
import { getAllSpecialties } from './store/apiRequest/apiUser'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import SpecialtyTranslation from './components/System/Admin/SpecialtyTranslation'

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpecialties())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/register' element={<Auth authRoute='register' />} />
                <Route path='/login' element={<Auth authRoute='login' />} />
                <Route path='/system' element={<System />}>
                    <Route path='manage-doctor' element={<ManageDoctor />} />
                    <Route path='manage-schedule' element={<ManageSchedule />} />
                    <Route path='manage-specialty' element={<ManageSpecialty />} />
                    <Route path='add-new-specialty' element={<AddSpecialty />} />
                    <Route path='translate-specialty' element={<SpecialtyTranslation />} />
                </Route>
                <Route path='/' element={<Homepage />} />
            </Routes>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default App
