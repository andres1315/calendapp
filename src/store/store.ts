import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./auth/authSlice"
import { modalReducer } from "./modal/modalSlice"
import { calendarReducer } from "./calendar/calendarSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    modal:modalReducer,
    calendar:calendarReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch