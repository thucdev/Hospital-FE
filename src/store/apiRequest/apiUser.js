import axios from '../../utils/axios'

const getAllSpecialties = async (dispatch) => {
    return axios.get(`/v1/api/get-all-specialties`)
}

export const registerUser = async (user, dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/register`, user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        console.log('', error)
    }
}

export { getAllSpecialties }
