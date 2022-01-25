import { Routes, Route } from 'react-router-dom'
import Auth from './Auth/views/Auth'
import Homepage from './components/Hompage/Homepage'
import './App.scss'
import { System } from './routes/System'
import ManageDoctor from './components/System/Admin/ManageDoctor'
import ManageSchedule from './components/System/Doctor/ManageSchedule'
import ManageSpecialty from './components/System/Admin/ManageSpecialty'
import { ToastContainer, toast } from 'react-toastify'

function App() {
    return (
        <>
            <Routes>
                <Route path='/register' element={<Auth authRoute='register' />} />
                <Route path='/login' element={<Auth authRoute='login' />} />
                <Route path='/system' element={<System />}>
                    <Route path='manage-doctor' element={<ManageDoctor />} />
                    <Route path='manage-schedule' element={<ManageSchedule />} />
                    <Route path='manage-specialty' element={<ManageSpecialty />} />
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
