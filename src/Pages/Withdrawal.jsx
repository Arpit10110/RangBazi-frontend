import React from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import "../Style/Withdrawal.css"
import axios from 'axios'
import {useSelector} from "react-redux"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Withdrawal = () => {
    const {UserName} = useSelector(state=>state.gambledeatil)
    const { User_id} = useSelector(state=>state.gambledeatil)
    const {UserEmail} = useSelector(state=>state.gambledeatil)
    const [Account,SetAccount]=useState("")
    const [Amount,SetAmount]=useState("")
    const [Ifsc,SetIfsc]=useState("")
    const [Bankname,SetBankname]=useState("")
    const [Branchname,SetBranchname]=useState("")
    const submit =async(e)=>{
        e.preventDefault();
        if(Amount>=10 && Amount<=50000){
            try {
                const {data}= await axios.post("https://rangbazi-backend.onrender.com/sentwithdrawal",{
                    email:UserEmail,
                    name:UserName,
                    userid:User_id,
                    amount:Amount,
                    bankname:Bankname,
                    account:Account,
                    ifsc:Ifsc,
                    branchname:Branchname,
                    pending:true
                })
               if(data.success==true)
               {
                toast.success("Withdrawal pending", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    SetAccount("");
                    SetAmount("");
                    SetBankname("");
                    SetIfsc("");
                    SetBranchname("");
               }
               else{
                toast.warn(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
               }
            } catch (error) {
                toast.warn(error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        }
        else{
            toast.warn("Amount should be 10-50000", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        }
        
  return (
  <>
  <Navbar/>
  <div className="withdrawa-main">
    <form onSubmit={submit} className="withdrawa-box">
        <input type="text" value={Account} onChange={(e)=>{
            SetAccount(e.target.value)
        }} placeholder='Enter the Account number' required />
        <input type="text" value={Ifsc} onChange={(e)=>{
            SetIfsc(e.target.value)
        }} placeholder='Enter the IFSC number' required />
        <div className="inner-input">
            <input type="text" value={Bankname} onChange={(e)=>{
                SetBankname(e.target.value)
            }} placeholder='Enter the Bank name' required />
            <input type="text" value={Branchname} onChange={(e)=>{
                SetBranchname(e.target.value)
            }} placeholder='Enter the Branch name' required />
        </div>
        <input type="text" value={Amount} onChange={(e)=>{
            SetAmount(e.target.value)
        }} placeholder='Enter the Amount' required />
        <h4>Note:-Min ₹10 Max ₹50000</h4>
        <button>Withdrawal</button>
    </form>
  </div>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
  </>
  )
}

export default Withdrawal
