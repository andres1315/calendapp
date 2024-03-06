import axios from "axios";

export const calendarApi = axios.create({
  baseURL: 'http://localhost:3010/api',
})


calendarApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
)


calendarApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // autorenew token
    if(error.response.status === 401){
      const token = localStorage.getItem('token')
      if(token){
        return calendarApi.post('/auth/refresh', {token})
        .then((response) => {
          const {data} = response
          localStorage.setItem('token', data.token)
          const config = error.config
          config.headers['Authorization'] = `Bearer ${data.token}`
          return calendarApi.request(config)
        })
      }
    }
    return Promise.reject(error)
  }
)