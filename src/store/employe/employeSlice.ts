import { createSlice } from "@reduxjs/toolkit";

export type Employe={
  id?:number
  firstName:string
  lastName:string
  phone:number
  user:string
  password:string
}

interface InitialState{
  employes:Employe[]
}

const initialState:InitialState={
  employes:[]
}
const employeSlice = createSlice({
  name:'employe',
  initialState,
  reducers:{
    loadEmployes:(state,{payload}:{payload:Employe[]})=>{
      state.employes=payload
    },
    newEmploye:(state,{payload}:{payload:Employe})=>{
      state.employes.push(payload)
    }
  }
})


export const employeReducer = employeSlice.reducer
export const {loadEmployes,newEmploye}= employeSlice.actions