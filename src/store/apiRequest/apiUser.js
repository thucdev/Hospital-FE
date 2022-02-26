import axios from "../../utils/axios"
import { getAllDoctorSuccess, getAllSpecialtiesSuccess } from "../reducer/userSlice"

const getAllSpecialties = () => async (dispatch) => {
   try {
      let res = await axios.get(`/get-all-specialties`)
      await dispatch(getAllSpecialtiesSuccess(res.data))
   } catch (error) {
      console.log("", error)
   }
}

const getAllDoctor = () => async (dispatch) => {
   try {
      let res = await axios.get(`/get-all-doctors`)
      await dispatch(getAllDoctorSuccess(res))
   } catch (error) {
      console.log("", error)
   }
}

export { getAllSpecialties, getAllDoctor }
