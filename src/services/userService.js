import axios from "../utils/axios"
import { createAxios } from "../utils/axiosJWT"
import { setHeader } from "../utils/setAuthHeader"
let axiosJWT = createAxios()

const createNewSpecialty = (data) => {
   return axiosJWT.post(`/create-new-specialty`, data, setHeader())
}

const createNewSpecialtyTranslation = (data) => {
   return axiosJWT.post(`/create-new-specialty-translation`, data, setHeader())
}

const getSpecialtyById = (id) => {
   return axiosJWT.get(`/get-specialty-by-id/?id=${id}`, setHeader())
}

const updateSpecialty = (data) => {
   return axiosJWT.put(`/update-specialty`, data, setHeader())
}

const deleteSpecialty = (id) => {
   return axiosJWT.delete(`/delete-specialty/?id=${id}`, setHeader())
}

const createDoctor = (data) => {
   return axiosJWT.post(`/create-doctor`, data, setHeader())
}

const getDoctorById = (id) => {
   return axiosJWT.get(`/get-doctor-by-id/?id=${id}`, setHeader())
}

const deleteDoctor = (id) => {
   return axiosJWT.delete(`/delete-doctor/?id=${id}`, setHeader())
}
const createAppointment = (data) => {
   return axiosJWT.post(`/create-an-appointment`, data, setHeader())
}

const verifyBookingAppointment = (data) => {
   return axios.post("/verify-appointment", data)
}

const getAllSchedules = () => {
   return axiosJWT.get("/get-all-schedules", setHeader())
}

const getAllSchedulesByDoctor = (doctorId) => {
   return axiosJWT.post("/get-all-schedules-by-doctor", doctorId, setHeader())
}

const checkIsEmailExist = (email) => {
   return axios.post("/is-email-exist", email)
}

const createQuestion = (data) => {
   return axios.post("/create-question", data)
}

const createNews = (data) => {
   return axiosJWT.post("/create-news", data, setHeader())
}

const getNews = (data) => {
   return axios.get(`/news?limit=${data?.limit}&page=${data?.page}`)
}

const paginationDoctor = (data) => {
   return axios.get(`/doctors?limit=${data?.limit}&page=${data?.page}`)
}

const getNewsById = (id) => {
   return axios.get(`/get-news-by-id/?id=${id}`)
}

const logout = (data) => {
   return axiosJWT.post("/logout", data, setHeader())
}

export {
   createNewSpecialty,
   getSpecialtyById,
   createNewSpecialtyTranslation,
   updateSpecialty,
   deleteSpecialty,
   createDoctor,
   getDoctorById,
   createAppointment,
   verifyBookingAppointment,
   deleteDoctor,
   getAllSchedules,
   checkIsEmailExist,
   getAllSchedulesByDoctor,
   createQuestion,
   createNews,
   getNews,
   getNewsById,
   paginationDoctor,
   logout,
}
