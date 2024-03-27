import {  createSlice } from "@reduxjs/toolkit";

const initialState={
  income:[]
}

export const incomeSlice = createSlice({
  name:'income',
  initialState:initialState,
  reducers:{
    onLoadIncomes:(state, {paylaod})=>{
      state.income = paylaod
    },
   
  }
})


export const incomeReducer = incomeSlice.reducer

export const {onLoadIncomes} = incomeSlice.actions