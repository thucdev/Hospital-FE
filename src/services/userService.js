import axios from "../utils/axios"
import { createAxios } from "../utils/axiosJWT"
import { setHeader } from "../utils/setAuthHeader"
let axiosJWT = createAxios()

const createNewSpecialty = (data) => {
   return axiosJWT.post(`/v1/api/create-new-specialty`, data, setHeader())
}

const createNewSpecialtyTranslation = (data) => {
   return axiosJWT.post(`/v1/api/create-new-specialty-translation`, data, setHeader())
}

const getSpecialtyById = (id) => {
   return axiosJWT.get(`/v1/api/get-specialty-by-id/?id=${id}`, setHeader())
}

const updateSpecialty = (data) => {
   return axiosJWT.put(`/v1/api/update-specialty`, data, setHeader())
}

const deleteSpecialty = (id) => {
   return axiosJWT.delete(`/v1/api/delete-specialty/?id=${id}`, setHeader())
}

const createDoctor = (data) => {
   return axiosJWT.post(`/v1/api/create-doctor`, data, setHeader())
}

const getDoctorById = (id) => {
   return axiosJWT.get(`/v1/api/get-doctor-by-id/?id=${id}`, setHeader())
}

const deleteDoctor = (id) => {
   return axiosJWT.delete(`/v1/api/delete-doctor/?id=${id}`, setHeader())
}
const createAppointment = (data) => {
   return axiosJWT.post(`/v1/api/create-an-appointment`, data, setHeader())
}

const verifyBookingAppointment = (data) => {
   return axios.post("/v1/api/verify-appointment", data)
}

const getAllSchedules = () => {
   return axiosJWT.get("/v1/api/get-all-schedules", setHeader())
}

const getAllSchedulesByDoctor = (doctorId) => {
   return axiosJWT.post("/v1/api/get-all-schedules-by-doctor", doctorId, setHeader())
}

const checkIsEmailExist = (email) => {
   return axios.post("/v1/api/is-email-exist", email)
}

const createQuestion = (data) => {
   return axios.post("/v1/api/create-question", data)
}

const createNews = (data) => {
   return axiosJWT.post("/v1/api/create-news", data, setHeader())
}

const getNews = (data) => {
   return axios.get(`/v1/api/news?limit=${data?.limit}&page=${data?.page}`)
}

const paginationDoctor = (data) => {
   return axios.get(`/v1/api/doctors?limit=${data?.limit}&page=${data?.page}`)
}

const getNewsById = (id) => {
   return axios.get(`/v1/api/get-news-by-id/?id=${id}`)
}

const logout = (data) => {
   return axiosJWT.post("/v1/api/logout", data, setHeader())
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
