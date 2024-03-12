import { createSlice } from "@reduxjs/toolkit"

export interface Tab{
  title:string,
  componentName:string,
  active:boolean
}

interface InitialState{
  tabs:Tab[]
}

const DEFAULT_NAVBAR = [
  {
    title:'Calendario',
    componentName:'Calendar',
    active:false
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
    title:'Ingresos',
    componentName:'Incomes',
    active:false
  },
  {
    title:'Egresos',
    componentName:'Expenditures',
    active:false
  },
  {
    title:'Servicios',
    componentName:'Services',
    active:false
  }
]

const tabsState =(()=>{
  const persistantState =  localStorage.getItem('amate_current_tab')
  if(!persistantState){
    DEFAULT_NAVBAR[0].active=true
  }else{
    DEFAULT_NAVBAR.find(tab=> tab.componentName === persistantState)!.active=true
  } 

  return DEFAULT_NAVBAR
  
})()


const initialState:InitialState={
  tabs:tabsState
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

export const {changeTab} =navBarSlice.actions