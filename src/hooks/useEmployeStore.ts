import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { CalendarApi } from "../api/calendarApi"
import { loadEmployes, newEmploye } from "../store/employe/employeSlice"
import Swal from "sweetalert2"
import { AxiosAdapter, AxiosError, AxiosResponse } from "axios"

import type {Employe} from '../store/employe/employeSlice'

export const useEmployeStore = () => {

  const dispatch =  useAppDispatch()
  const {employes} = useAppSelector(state=>state.employe)
  const calendarApi =  new CalendarApi

  useEffect(()=>{
    onLoadEmployes()
  },[])

  const onLoadEmployes =()=>{
    calendarApi
      .get('/employes')
      .then((response)=>{
        const {data } =response
        dispatch(loadEmployes(data)) 
      })
      .catch((e)=> handleErrorApiEmploye(e,'Error al obtener los empleados'))
  }

  const onNewEmploye = (data:Employe)=>{
    return calendarApi
      .post('/employes',data)
      .then((response)=>{
        const {data} = response
        dispatch(newEmploye(data))
        return response
      })
      .catch((e)=> handleErrorApiEmploye(e,'Error creando el empleado'))
  }

  const onFindEmploye = (name:string):Promise<any>=>{
    return calendarApi
    .get(`/employes/filter?name=${name}`)
    .catch((e)=> handleErrorApiEmploye(e,'Error buscando los empleado'))
  }


  const handleErrorApiEmploye = (e:AxiosError , text:string)=>{
    console.log('[useEmployeStore]',e)
    const messageError = e.response?.data?.message || text ||  'Error procesado la solicitud de empleados'
    Swal.fire({
      title:'Ooops',
      text: messageError,
      icon: 'error'
    })
  }

  return {
    employes,
    onNewEmploye,
    onFindEmploye
  }
}
