import { AxiosError } from "axios"
import { CalendarApi } from "../api/calendarApi"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { Service, addNewService, loadService } from "../store/service/serviceSlice"
import Swal from "sweetalert2"
import { useEffect } from "react"

export const useServiceStore = () => {
  
  const {service} =  useAppSelector(state => state.service)

  const dispatch = useAppDispatch()

  const calendarApi = new CalendarApi

  useEffect(()=>{
    onLoadServices()
  },[])


  const onLoadServices = async()=>{
    calendarApi
      .get('/services')
      .then((res)=>{
        const {data} = res
        dispatch(loadService(data))
      })
      .catch(e=>handleErrorApiService(e,'Ocurrio un error obteniendo los servicios'))
  }


  const onAddService = async(service:Service)=>{
    return calendarApi
      .post('/services',service)
      .then((res)=>{
        const {status,data} = res
        if(status == 201){

          const newServices = {
            ...service,
            id:data.id
          }
          dispatch(addNewService(newServices))
          return res
        }
      })
  }

  const handleErrorApiService = (e:AxiosError , text:string)=>{
    console.log('[useEmployeStore]',e)
    const messageError = e.response?.data?.message || text ||  'Error procesado la solicitud de empleados'
    Swal.fire({
      title:'Ooops',
      text: messageError,
      icon: 'error'
    })
  }

  return {
    service,
    onAddService
  }
}
