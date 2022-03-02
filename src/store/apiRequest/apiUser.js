import axios from "../../utils/axios"
import { getAllDoctorSuccess, getAllSpecialtiesSuccess } from "../reducer/userSlice"

const getAllSpecialties = () => async (dispatch) => {
   try {
      let res = await axios.get(`/v1/api/get-all-specialties`)
      await dispatch(getAllSpecialtiesSuccess(res.data))
   } catch (error) {
      console.log("", error)
   }
}

const getAllDoctor = () => async (dispatch) => {
   try {
      let res = await axios.get(`/v1/api/get-all-doctors`)
      if (res) {
         let dataUser = res?.data.map((item) => {
            return {
               ...item,
               image: Buffer.from(item.image, "base64").toString("binary"),
               doctor_infoData: {
                  experience: JSON.parse(item.doctor_infoData.experience),
                  degree: JSON.parse(item.doctor_infoData.degree),
                  certificate: JSON.parse(item.doctor_infoData.certificate),
                  member: JSON.parse(item.doctor_infoData.member),
                  field: JSON.parse(item.doctor_infoData.field),
               },
            }
         })

         await dispatch(getAllDoctorSuccess(dataUser))
      }
   } catch (error) {
      console.log("", error)
   }
}

export { getAllSpecialties, getAllDoctor }
