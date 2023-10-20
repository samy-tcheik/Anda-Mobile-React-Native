import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { API_URL } from '../global'

const api = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'fr',
    Accept: 'application/json',
  },
  responseType: 'json',
})

api.interceptors.response.use(
  function (response) {
    if (response.config.method?.toLowerCase() !== 'get') {
      return response.data
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('user_token')
    // console.log(accessToken)
    config.headers = {
      'Accept-Language': 'fr',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    } as any
    return config
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error)
  }
)

export default api
