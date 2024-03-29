import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./auth/authSlice"
import { modalReducer } from "./modal/modalSlice"
import { calendarReducer } from "./calendar/calendarSlice"
import { navBarReducer } from "./navbar/navBarSlice"
import { customerReducer } from "./customer/customerSlice"
import { employeReducer } from "./employe/employeSlice"
import { servicesReducer } from "./service/serviceSlice"
import { incomeReducer } from "./income/incomeSlice"

const persistanLocalStorageMiddleware = (store)=>(next)=>(action)=>{

  next(action)

  if(action.type === 'navBar/changeTab'){
    const {componentName} = action.payload
    localStorage.setItem('amate_current_tab',componentName)
  }
}

export const store = configureStore({
  reducer: {
    auth:authReducer,
    modal:modalReducer,
    calendar:calendarReducer,
    navbar:navBarReducer,
    customer:customerReducer,
    employe:employeReducer,
    service:servicesReducer,
    income:incomeReducer
  },
  middleware: (getDefaultEnhancers)=> getDefaultEnhancers().concat(persistanLocalStorageMiddleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch