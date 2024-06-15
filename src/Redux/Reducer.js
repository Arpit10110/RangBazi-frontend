import { createAction,createReducer } from "@reduxjs/toolkit";
const Profile=createAction('Profile')
const logout=createAction('logout')
const walletminus=createAction('walletminus')
const addwallet=createAction('addwallet')
export  const gamblereducer=createReducer({
   UserName:localStorage.getItem("RanbaazUserName")? localStorage.getItem("RanbaazUserName") :"",
   Wallet:500,
   UserPhone:localStorage.getItem("RanbaazPhone")? localStorage.getItem("RanbaazPhone") :"",
   UserEmail:localStorage.getItem("RanbaazEmail")? localStorage.getItem("RanbaazEmail") :"",
   User_id:localStorage.getItem("RanbaazID")? localStorage.getItem("RanbaazID") :"",
  },
(builder)=>{
    builder.addCase(Profile,(state,action)=>{
      const value=action.payload;
      state.UserName=value.name;
      state.UserEmail=value.email;
      state.UserPhone=value.phone;
      state.Wallet=value.wallet;
      state.User_id=value.User_id;
      localStorage.setItem("RanbaazUserName",state.UserName);
      localStorage.setItem("RanbaazEmail",state.UserEmail);
      localStorage.setItem("RanbaazPhone",state.UserPhone);
      localStorage.setItem("RanbaazID",state.User_id);
    })
    builder.addCase(logout,(state)=>{
      state.UserName="";
      state.UserEmail="";
      state.UserPhone="";
      state.Wallet=0;
      state.User_id="";
      localStorage.setItem("RanbaazUserName",state.UserName);
      localStorage.setItem("RanbaazEmail",state.UserEmail);
      localStorage.setItem("RanbaazPhone",state.UserPhone);
      localStorage.setItem("RanbaazID",state.User_id);
    })
    builder.addCase(walletminus,(state,action)=>{
      state.Wallet=action.payload;
    })
    builder.addCase(addwallet,(state,action)=>{
      state.Wallet=action.payload;
    })
}) 