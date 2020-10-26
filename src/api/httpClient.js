import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  timeout: 60000 // Value in ms. 15 seconds, should move this to config file.
})
/**
 * Managing Auth Credentials using `axios` interceptor.
 * Here we are creating an `auth` intercaptor to inject headers.
 */
const getAuthToken = () =>
  localStorage.getItem('user') != null
    ? `Bearer ${localStorage.getItem('user')}`
    : ''

    const authInterceptor = config => {
      config.headers['Authorization'] = getAuthToken()
      console.log("authInterceptor",getAuthToken())
  
      return config
    }
    httpClient.interceptors.request.use(authInterceptor)

    const responseInterceptor = response => {
      return response
    }

    httpClient.interceptors.response.use(responseInterceptor)

export default httpClient