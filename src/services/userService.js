import axios from "../utils/axios"

const createNewSpecialty = (data) => {
   return axios.post(`/create-new-specialty`, data)
}

const createNewSpecialtyTranslation = (data) => {
   return axios.post(`/create-new-specialty-translation`, data)
}

const getSpecialtyById = (id) => {
   return axios.get(`/get-specialty-by-id/?id=${id}`)
}

const updateSpecialty = (data) => {
   return axios.put(`/update-specialty`, data)
}

const deleteSpecialty = (id) => {
   return axios.delete(`/delete-specialty`, {
      data: {
         id: id,
      },
   })
}

const createDoctor = (data) => {
   return axios.post(`/create-doctor`, data)
}

const getDoctorById = (id) => {
   return axios.get(`/get-doctor-by-id/?id=${id}`)
}

const deleteDoctor = (id) => {
   return axios.delete(`/delete-doctor`, {
      data: {
         id: id,
      },
   })
}
const createAppointment = (data) => {
   return axios.post(`/create-an-appointment`, data)
}

const verifyBookingAppointment = (data) => {
   return axios.post("/verify-appointment", data)
}

const getAllSchedules = () => {
   return axios.get("/get-all-schedules")
}

const getAllSchedulesByDoctor = (doctorId) => {
   return axios.post("/get-all-schedules-by-doctor", doctorId)
}

const checkIsEmailExist = (email) => {
   return axios.post("/is-email-exist", email)
}

const createQuestion = (data) => {
   return axios.post("/create-question", data)
}

const createNews = (data) => {
   return axios.post("/create-news", data)
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
}
