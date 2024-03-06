
export interface EventForm {
  customerId: number | string;
  service: number | string;
  employeId: number | string;
  start: string;
  end: string;
  notes?: string;
}

export const convertEventsToCalendarEvents = (event:EventForm[]) => {



  return event.map(({customerId, service, employeId, start, end, notes}) => {
    const title = `Cita con ${customerId} para ${service} con ${employeId} observaciones: ${notes}`;
    return {
      title: title,
      start,
      end
    }
  })
}
