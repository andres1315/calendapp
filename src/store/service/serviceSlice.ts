import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type Service = {
  id?:number,
  service:string,
  state:number,
  time:number
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
    }
  }
})


export const servicesReducer = serviceSlice.reducer
export const {loadService} = serviceSlice.actions