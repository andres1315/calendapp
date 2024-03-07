import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./auth/authSlice"
import { modalReducer } from "./modal/modalSlice"
import { calendarReducer } from "./calendar/calendarSlice"
import { navBarReducer } from "./navbar/navBarSlice"
import { customerReducer } from "./customer/customerSlice"
import { employeReducer } from "./employe/employeSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    modal:modalReducer,
    calendar:calendarReducer,
    navbar:navBarReducer,
    customer:customerReducer,
    employe:employeReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch