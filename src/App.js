import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "./App.scss"
import Auth from "./Auth/views/Auth"
import DetailNews from "./components/Detail/DetailNews"
import DetailSpecialty from "./components/Detail/DetailSpecialty"
import AskDoctor from "./components/Hompage/AskDoctor"
import FindDoctor from "./components/Hompage/FindDoctor"
import Homepage from "./components/Hompage/Homepage"
import NewsPage from "./components/News/NewsPage"
import Page404 from "./components/Page404"
import BookingAppointment from "./components/Patient/BookingAppointment"
import ConfirmEmail from "./components/Patient/ConfirmEmail"
import ConfirmEmailSuccess from "./components/Patient/ConfirmEmailSuccess"
import AddSpecialty from "./components/System/Admin/MagageSpecialty/AddSpecialty"
import EditSpecialty from "./components/System/Admin/MagageSpecialty/EditSpecialty"
import ManageSpecialty from "./components/System/Admin/MagageSpecialty/ManageSpecialty"
import SpecialtyTranslation from "./components/System/Admin/MagageSpecialty/SpecialtyTranslation"
import CreateDoctor from "./components/System/Admin/ManageDoctor/CreateDoctor"
import ManageDoctor from "./components/System/Admin/ManageDoctor/ManageDoctor"
import ManageSchedule from "./components/System/Admin/ManageDoctor/ManageSchedule"
import AddNews from "./components/System/Doctor/AddNews"
import ManageScheduleDoctor from "./components/System/Doctor/ManageScheduleDoctor"
import ProtectedRoutesAdmin from "./hoc/ProtectedRoutesAdmin"
import ProtectedRoutesDoctor from "./hoc/ProtectedRoutesDoctor"
import { System } from "./routes/System"
import { getAllDoctor, getAllSpecialties } from "./store/apiRequest/apiUser"

function App() {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getAllSpecialties())
      dispatch(getAllDoctor())
   }, [dispatch])

   return (
      <>
         <Routes>
            <Route path='/register' element={<Auth authRoute='register' />} />
            <Route path='/login' element={<Auth authRoute='login' />} />

            <Route path='/system' element={<System />}>
               <Route element={<ProtectedRoutesAdmin />}>
                  <Route path='manage-doctor' element={<ManageDoctor />} />
                  <Route path='create-doctor' element={<CreateDoctor />} />

                  <Route path='manage-schedule' element={<ManageSchedule />} />

                  <Route path='manage-specialty' element={<ManageSpecialty />} />
                  <Route path='add-new-specialty' element={<AddSpecialty />} />
                  <Route path='translate-specialty' element={<SpecialtyTranslation />} />
                  <Route path='edit-specialty' element={<EditSpecialty />} />
               </Route>

               <Route element={<ProtectedRoutesDoctor />}>
                  <Route path='manage-schedule-by-doctor' element={<ManageScheduleDoctor />} />
                  <Route path='manage-news' element={<AddNews />} />
               </Route>
            </Route>
            <Route path='/booking-appointment' element={<BookingAppointment />} />
            <Route path='/find-doctor' element={<FindDoctor />} />
            <Route path='/ask-doctor' element={<AskDoctor />} />
            <Route path='/news' element={<NewsPage />} />

            <Route path='/detail-specialty/:id' element={<DetailSpecialty />} />
            <Route path='/detail-news/:id' element={<DetailNews />} />

            <Route path='/confirm-email' element={<ConfirmEmail />} />
            <Route path='/verify-appointment' element={<ConfirmEmailSuccess />} />
            <Route path='/*' element={<Page404 />} />
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
