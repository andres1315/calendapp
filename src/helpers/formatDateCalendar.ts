import {  format } from "@formkit/tempo"

export const formateDateCalendar = (date:Date)=>{
  const formatDateCalendar ="YYYY-MM-DDTHH:mm:ss"

  return format(date, formatDateCalendar);
}

