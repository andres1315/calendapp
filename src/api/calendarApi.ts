import axios from "axios";
const URL_API='http://localhost:3010/api'

export const axiosIntance = axios.create({
  baseURL: URL_API,
})
axiosIntance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
)


axiosIntance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // autorenew token
    if(error.response.status === 401){
      const token = localStorage.getItem('token')
      if(token){
        return axiosIntance.post('/auth/refresh', {token})
        .then((response) => {
          const {data} = response
          localStorage.setItem('token', data.token)
          const config = error.config
          config.headers['Authorization'] = `Bearer ${data.token}`
          return axiosIntance.request(config)
        })
      }
    }
    return Promise.reject(error)
  }
)


export class CalendarApi {


  async get(url:string){
    const {data,status} = await axiosIntance.get(url)
    return {data,status}
  }

  async post(url:string, dataRequest){
    const {data,status} = await axiosIntance.post(url,dataRequest)
    return {data,status}

  }
}