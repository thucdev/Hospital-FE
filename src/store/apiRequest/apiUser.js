import axios from '../../utils/axios'
import { getAllSpecialtiesSuccess } from '../reducer/userSlice'

const getAllSpecialties = () => async (dispatch) => {
    try {
        let res = await axios.get(`/get-all-specialties`)
        // console.log('res', res)
        await dispatch(getAllSpecialtiesSuccess(res.data))
    } catch (error) {
        console.log('', error)
    }
}

export { getAllSpecialties }
