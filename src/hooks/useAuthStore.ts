import { CalendarApi } from "../api/calendarApi";
import { onLogin, onLogout } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

export const useAuthStore = () => {
  const { token, user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const calendarApi  = new CalendarApi

  const onStartLogin = async ({user,password}: {user: string;password: string;}) => {
    await calendarApi
      .post("/auth/login", { user, password })
      .then((response) => {
        const { data } = response;
        dispatch(onLogin(data));
      })
      .catch((error) => {
        console.log(error);
        const message =
          error.response.data.message || "Error intentando iniciar sesión";
        dispatch(onLogout(message));
      });
  };
  return {
    token,
    user,
    loading,
    error,
    onStartLogin,
  };
};
