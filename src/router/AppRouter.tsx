import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { LoginPage } from "../auth/pages/LoginPage";
import { WrappedCalendarPage } from "../calendar/pages/WrappedCalendarPage";

export const AppRouter = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<PrivateRoute component={WrappedCalendarPage }/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
