import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { useState } from "react";
import { Button } from "flowbite-react";
import { format, addHour } from "@formkit/tempo";
import { CustomModal } from "../../common/components/CustomModal";
import { NewEvent } from "../components/NewEvent";
import { useModalStore } from "../../hooks/useModalStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";





export const CalendarPage = () => {
  const {events} = useCalendarStore();
  const { openModal} = useModalStore();



  const handleAddNewEvent = () => {
    openModal({title:'Nueva Cita'})
  }



  return (
    <>
    
    <section className="flex flex-col overflow-hidden">
      <Button gradientMonochrome="purple" className="w-28" size={"sm"} onClick={()=>handleAddNewEvent()}>
        Nueva Cita
      </Button>
      <div className="flex max-h-[calc(100vh-10em)]  ">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          dateClick={function (arg) {
            const currentDate = new Date();
            console.log(currentDate);
            const newEvent = {
              title: "New Event",
              start: "2024-02-19T12:00:00",
              end: new Date(arg.date),
              color: "blue",
              
            };
          }}
          events={events}
          locale={esLocale}
          stickyHeaderDates={true}

          scrollTime={"09:00:00"}
          timeZone="America/Bogota"
          slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: true }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          slotDuration="00:15:00"
          slotMinTime="08:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          height="auto"
          contentHeight={"auto"}
          nowIndicator={true}
          navLinks={true}
          eventClick={function (arg) {
            console.log(arg);
          }}
          eventDrop={function (arg) {
            console.log(arg);
          }}
          eventResize={function (arg) {
            console.log(arg);
          }}
          eventAdd={function (arg) {
            console.log(arg);
          }}
          eventChange={function (arg) {
            console.log(arg);
          }}
          eventRemove={function (arg) {
            console.log(arg);
          }}
          eventMouseEnter={function (arg) {
            console.log(arg);
          }}
          eventMouseLeave={function (arg) {
            console.log(arg);
          }}
        />
      </div>
    </section>
    <CustomModal  >
      <NewEvent/>
    </CustomModal>
    </>
  );
};
