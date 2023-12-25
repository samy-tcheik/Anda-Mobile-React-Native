import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { API_URL } from '../global'
import i18n from './i18n'
import GetLocation from 'react-native-get-location'

const api = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'fr',
    Accept: 'application/json',
    language: i18n.language,
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
    const language = await AsyncStorage.getItem('language')
    // const position = await GetLocation.getCurrentPosition()
    config.headers = {
      'Accept-Language': language,
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Location-latitude': 36.74529209631143,
      'Location-longitude': 3.052477133545479,
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
