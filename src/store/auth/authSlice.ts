import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {},
  token: null,
  loading: false,
  error: null,
};


export const authSlice =  createSlice({
  name: 'auth',
  initialState: initialState,
  reducers:{
    onLogin: (state, {payload}) => {
      state.loading = true;
      state.error = null;
      state.token = payload.token;
      state.user = payload.user;
    },
    onLogout: (state,{payload}) => {  
      state.loading = false;
      state.error = payload.message || '';
      state.token = null;
      state.user = {};
    }
  }
})

export const authReducer = authSlice.reducer;
export const { onLogin, onLogout } = authSlice.actions;