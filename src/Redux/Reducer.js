import { createAction,createReducer } from "@reduxjs/toolkit";
const Profile=createAction('Profile')
const logout=createAction('logout')
export  const gamblereducer=createReducer({
   UserName:"",
   Wallet:0,
   UserPhone:"",
   UserEmail:"",
   User_id:"",
  },
(builder)=>{
    builder.addCase(Profile,(state,action)=>{
      const value=action.payload;
      state.UserName=value.name;
      state.UserEmail=value.email;
      state.UserPhone=value.phone;
      state.Wallet=value.wallet;
      state.User_id=value.User_id;
    })
    builder.addCase(logout,(state)=>{
      state.UserName="";
      state.UserEmail="";
      state.UserPhone="";
      state.Wallet=0;
      state.User_id="";
    })
}) 