import axios from '../utils/axios'

const createNewSpecialty = (data) => {
    return axios.post(`/create-new-specialty`, data)
}

const getAllSpecialties = () => {
    return axios.get(`/get-all-specialties`)
}

export { createNewSpecialty, getAllSpecialties }
