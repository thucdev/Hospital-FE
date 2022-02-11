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

const createDoctor = (data) => {
   return axios.post(`/create-doctor`, data)
}

const createAppointment = (data) => {
   return axios.post(`/create-an-apointment`, data)
}

export {
   createNewSpecialty,
   getSpecialtyById,
   createNewSpecialtyTranslation,
   updateSpecialty,
   createDoctor,
   createAppointment,
}
