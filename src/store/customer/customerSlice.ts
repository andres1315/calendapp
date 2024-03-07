import { createSlice } from "@reduxjs/toolkit";


export type Customer={
  id?:number
  firstName:string,
  lastName:string,
  phone:number
}

interface InitialState{
  customers:Customer[]
}

const initialState:InitialState = {
  customers:[]
}

export const customerSlice =  createSlice({
  name:'customer',
  initialState,
  reducers:{
    loadCustomers:(state,{payload}:{payload:Customer[]})=>{
      state.customers = payload
    },
    addCustomer:(state,{payload}:{payload:Customer})=>{
      state.customers.push(payload)
    }
  }
})


export const customerReducer = customerSlice.reducer
export const {loadCustomers,addCustomer} = customerSlice.actions