import { useEffect, useState } from "react"
import { calendarApi } from "../api/calendarApiAxios"
import Swal from "sweetalert2"
import { useAppDispatch, useAppSelector } from "../store/hook"
import {  addCustomer, loadCustomers } from "../store/customer/customerSlice"
import type {Customer} from '../store/customer/customerSlice'
import { AxiosError } from "axios"


export const useCustomers = () => {
  const dispatch = useAppDispatch()
  const {customers} =  useAppSelector(state=>state.customer)


  useEffect(()=>{
    getCustomer()
  },[])


  const createCustomer = (data:Customer)=>{
    return calendarApi
      .post('/customers',data)
      .then((response)=>{
        const {data} = response
        dispatch(addCustomer(data))
        return response
      })
      .catch((e)=>{
        handleErrorApiCustomer(e,'Error creado el cliente')
      })
  }

  const getCustomer = ()=>{
    calendarApi
    .get('/customers')
    .then((response)=>{
      const {data} = response
      dispatch(loadCustomers(data))
    })
    .catch((e)=>{
      handleErrorApiCustomer(e, 'Error al obtener los clientes')
    })
  }


  const handleErrorApiCustomer = (error:AxiosError,textError:string)=>{
      console.log('[customersHook]', error)
      const messageError = error.response?.data?.message || textError || '[customersHook] Error processing request'
      Swal.fire({
        title:'Oops...',
        text:messageError,
        icon:"error"
      })
  }
  return {
    customers,
    getCustomer,
    createCustomer
  }
  
}
