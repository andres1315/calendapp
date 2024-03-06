import { createSlice } from "@reduxjs/toolkit";

const initialState={
  modalTitle:'',
  isOpen:false
}
export const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers:{
    onOpenModal:(state,{payload})=>{
      state.modalTitle=payload.title;
      state.isOpen=true;
    },
    onCloseModal:(state)=>{
      state.modalTitle='';
      state.isOpen=false;
    }
  }
})


export const modalReducer = modalSlice.reducer;

export const {onOpenModal,onCloseModal} = modalSlice.actions;