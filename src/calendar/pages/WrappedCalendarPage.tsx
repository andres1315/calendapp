import { LayoutCalendar } from "../layout/LayoutCalendar";

import { CalendarPage } from "./CalendarPage";

export const WrappedCalendarPage = () => {
  return (
    <LayoutCalendar>
      <CalendarPage />
    </LayoutCalendar>
  );
};
