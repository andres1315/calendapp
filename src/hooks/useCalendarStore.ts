import { useAppDispatch, useAppSelector } from "../store/hook";
import { CalendarApi } from "../api/calendarApi";
import { onAddEvent, onLoadEvents } from "../store/calendar/calendarSlice";

import Swal from "sweetalert2";
import {
  EventForm,
  convertEventsToCalendarEvents,
} from "../helpers/convertEventsToCalendarEvents";


export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent, loading } = useAppSelector((state) => state.calendar);
  const calendarApi =  new CalendarApi
  const loadCurrentEvents = async () => {
    return calendarApi
      .get("/events")
      .then((response) => {
        const { data } = response;
        dispatch(onLoadEvents(data));
      })
      .catch((error) => {
        console.log(error);
        // TODO: dispatch error
      });
  };

  const addNewEvent = async (event: EventForm) => {
    const  formatTimeIso8601= "YYYY-MM-DDTHH:mm:ssZ"
    
    const eventDb = {
      ...event,
      title: `Cita con ${event.customerId} para ${event.service} con ${event.employeId} observaciones: ${event.notes}`,
      
    };
    console.log(eventDb);
    return calendarApi
      .post("/calendar", eventDb)
      .then((response) => {
        const { data } = response;
        const newEvent = convertEventsToCalendarEvents([event])[0];
        dispatch(onAddEvent({ ...newEvent, id: data.id }));
      })
      .catch((error) => {
        const message = error.response.data.message;
        const errorMessage =
          message.length > 0 ? message.join("-") : "Error al crear el evento";
        Swal.fire("Error", errorMessage, "error");
        // TODO: dispatch error
      });
  };

  return {
    events,
    activeEvent,
    loadingEvents: loading,

    loadCurrentEvents,
    addNewEvent,
  };
};
