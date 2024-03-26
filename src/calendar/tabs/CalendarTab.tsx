import { Button } from "flowbite-react";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useModalStore } from "../../hooks/useModalStore";
import FullCalendar from "@fullcalendar/react";
import { CustomModal } from "../../common/components/CustomModal";
import { NewEvent } from "../components/NewEvent";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { useState } from "react";
import { PreviewEvent } from "../components/PreviewEvent";


import { EventClickArg } from "@fullcalendar/core/index.js";
import { EventDatabase } from "../../types";



export const CalendarTab = () => {
  const { events,eventDisplay } = useCalendarStore();
  const { openModal } = useModalStore();
  const [currentModal,setCurrentModal] = useState('')


  const handleAddNewEvent = () => {
    setCurrentModal('newEvent')
    openModal({ title: "Nueva Cita" });
  };


  const handlePreviewEvent = (event:EventClickArg)=>{
    const idEvent  = event.el.fcSeg.eventRange.def.publicId
    eventDisplay(+idEvent)
    setCurrentModal('previewEvent')
    openModal({ title: "Detalle Evento" });
  }


  const ComponentModal =()=>{
    if(currentModal =='newEvent'){
      return <NewEvent/>
    }else if(currentModal == 'previewEvent'){
      return <PreviewEvent />
    }else{
      return <h1>No encontrado</h1>
    }
  }

  return (
    <>
      <section className="flex flex-col overflow-hidden">
        <Button
          gradientMonochrome="purple"
          className="w-28"
          size={"sm"}
          onClick={() => handleAddNewEvent()}
        >
          Nueva Cita
        </Button>
        <div className="flex max-h-[calc(100vh-10em)]  ">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridDay"
            dateClick={function (arg) {
              const currentDate = new Date();
              console.log(arg);
            }}
            events={events}
            locale={esLocale}
            eventColor="rgb(210 150 150)"
            stickyHeaderDates={true}
            scrollTime={"09:00:00"}
            timeZone="America/Bogota"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }}
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

              handlePreviewEvent(arg)
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
            /* eventMouseEnter={function (arg) {
              console.log(arg);
            }}
            eventMouseLeave={function (arg) {
              console.log(arg);
            }} */
          />
        </div>
      </section>
      <CustomModal>
        {ComponentModal()}
      </CustomModal>
    </>
  );
};
