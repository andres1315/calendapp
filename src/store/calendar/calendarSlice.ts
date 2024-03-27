
import { createSlice } from "@reduxjs/toolkit";
import { EventDatabase } from "../../types";


export interface Event {
  id: number;
  title: string;
  start: string,
  end: string,
  textColor?: string,
  color?: string,
}

const initialState = {
  loading: false,
  events: [],
  activeEvent: null
}
export const calendarSlice =  createSlice({
  name:'calendar',
  initialState,
  reducers:{
    onAddEvent: (state, {payload}:{payload:Event}) => {
      state.activeEvent = null;
      state.loading = true;
      state.events.push(payload);
      state.loading = false;
    },
    onSetActiveEvent: (state,{payload}) => {  
      state.activeEvent = payload;
    },
    onRemoveActiveEvent:(state)=>{
      state.activeEvent=null
    },
    onClearActiveEvent: (state) => {  
      state.activeEvent = null;
    },
    onLoadEvents: (state,{payload}) => {
      state.loading = false
      state.events = payload;
      state.activeEvent = null;
    
    },
    onUpdateEvent:(state,{payload})=>{
      const eventId = payload.id
      const index = state.events.findIndex((event:EventDatabase) => event.id == eventId)
      state.events[index] = payload
    }
  }

})

export const calendarReducer = calendarSlice.reducer;
export const { onAddEvent, onRemoveActiveEvent, onSetActiveEvent, onClearActiveEvent,onLoadEvents, onUpdateEvent } = calendarSlice.actions;
