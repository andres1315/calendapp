
export interface EventForm {
  customerId: number | string;
  serviceId: number | string ;
  employeId: number | string ;
  start: string;
  end: string;
  notes?: string;
  title:string;
  price:number
}

export const convertEventsToCalendarEvents = (event:EventForm[]) => {



  return event.map(({customerId, serviceId, employeId, start, end, notes}) => {
    const title = `Cita con ${customerId} para ${serviceId} con ${employeId} observaciones: ${notes}`;
    return {
      title: title,
      start,
      end
    }
  })
}
