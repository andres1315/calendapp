import { AxiosError } from "axios"
import { CalendarApi } from "../api/calendarApi"
import { useAppSelector } from "../store/hook"
import Swal from "sweetalert2"
import { PayToEvent } from "../calendar/components/PreviewEvent"

export const useIncome = ()=>{

  const {income} = useAppSelector(state =>state.income)
  const calendarApi = new CalendarApi()


  const onCreateIncomeToEvent = (data:PayToEvent)=>{
    return calendarApi
    .post('/incomes',data)
    .then(res=>{
      const {data,status} = res
      return res
    })
    .catch((e)=>handleErrorApiEmploye(e, 'Error Creando el ingreso'))
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
    income,
    onCreateIncomeToEvent
  }
}