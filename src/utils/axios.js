import axios from 'axios'
import _ from 'lodash'
import { apiUrl } from './constant'

const instance = axios.create({
    baseURL: apiUrl,
})

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code
    const { data } = response
    return response.data
})

export default instance
