import axios from '../utils/axios'

const createNewSpecialty = (data) => {
    return axios.post(`/create-new-specialty`, data)
}

// const getAllSpecialties = () => {
//     return axios.get(`/get-all-specialties`)
// }

const getSpecialtyById = (id) => {
    return axios.get(`/get-specialty-by-id/?id=${id}`)
}

export {
    createNewSpecialty,
    // getAllSpecialties,
    getSpecialtyById,
}
