import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type Service = {
  id?:number,
  service:string,
  state?:number,
  time:number,
  isMounting:number
}

interface InitialState{
  service:Service[]
}


const initialState:InitialState = {
  service:[]
}
export const serviceSlice = createSlice({
  name:'service',
  initialState,
  reducers:{
    loadService:(state, action:PayloadAction<Service[]>)=>{
      state.service = action.payload
    },
    addNewService:(state,action:PayloadAction<Service>)=>{
      state.service.push(action.payload)
    }
  }
})


export const servicesReducer = serviceSlice.reducer
export const {loadService,addNewService} = serviceSlice.actions