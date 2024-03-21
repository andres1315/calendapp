import { useAppDispatch, useAppSelector } from "../store/hook";
import { CalendarApi } from "../api/calendarApi";
import { onAddEvent, onLoadEvents } from "../store/calendar/calendarSlice";

import Swal from "sweetalert2";
import { EventForm } from "../helpers/convertEventsToCalendarEvents";
import { useEffect } from "react";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent, loading } = useAppSelector(
    (state) => state.calendar
  );
  const calendarApi = new CalendarApi();

  useEffect(()=>{
    loadCurrentEvents()
  },[])

  const loadCurrentEvents = async () => {
    return calendarApi
      .get("/calendar")
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
  
    return calendarApi
      .post("/calendar", event)
      .then((response) => {
        const { data } = response;
        const { title, start, end } = event;
        const newEvent = { title, start, end, id: data.id };
        dispatch(onAddEvent(newEvent));
        return response
      })
      .catch((error) => {
        console.log('errorUseCalendar',error)
        const message = error.response?.data?.message || '';
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
    addNewEvent,
  };
};
