import { createSlice } from "@reduxjs/toolkit"

export interface Tab{
  title:string,
  componentName:string,
  active:boolean
}

interface InitialState{
  tabs:Tab[]
}


const initialState:InitialState={
  tabs:[
    {
      title:'Calendario',
      componentName:'Calendar',
      active:true
    },
    {
      title:'Clientes',
      componentName:'Customers',
      active:false
    },
    {
      title:'Empleados',
      componentName:'Employes',
      active:false
    },
    {
      title:'Ingesos',
      componentName:'Incomes',
      active:false
    },
    {
      title:'Egresos',
      componentName:'Expenditures',
      active:false
    }
  ]
}
    
  


export const navBarSlice =  createSlice({
  name:'navBar',
  initialState,
  reducers:{
    changeTab:(state,{payload})=>{
      state.tabs =state.tabs.map((tab)=>{
        const active =  tab.title === payload.title
        return {
          ...tab,
          active
        }
      })
    },
  }

})

export const navBarReducer = navBarSlice.reducer

export const {changeTab,currentActiveTab} =navBarSlice.actions