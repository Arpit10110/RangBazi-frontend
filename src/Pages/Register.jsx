import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import "../Style/Register.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
const Register = () => {
  const Navigate =useNavigate();
  const dispatch =useDispatch();
    const [name,Setname]=useState("")
    const [phone,Setphone]=useState("")
    const [password,Setpassword]=useState("")
    const [email,Setemail]=useState("")
    const register = async (e)=>{
            e.preventDefault()
          try {
            const {data}= await axios.post(`http://localhost:4000/register`,{
              name:name,
              phone:phone,
              email:email,
              password:password
             })
            if(data.success==false)
            {
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
                Setname("")
                Setemail("")
                Setpassword("")
                Setphone("")
            }
            else{
              dispatch({
                type:"Profile",
                payload:{
                      name:name,
                      email:email,
                      phone:phone,
                      User_id:data.id,
                      wallet:0
                }
              })
              Navigate("/")
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
              Setname("")
              Setemail("")
              Setpassword("")
              Setphone("")
          }
    }
  return (
    <>
    <Navbar/>
    <div className="login-main">
        <form onSubmit={register}  className="login-box">
            <input type="text" value={name} onChange={(e)=>{
                Setname(e.target.value)
            }} placeholder="Enter the Name" required />
            <input type="text" value={email} onChange={(e)=>{
               Setemail(e.target.value)
            }} placeholder='Enter the Email' required/>
            <input type="password" value={password} onChange={(e)=>{
               Setpassword(e.target.value)
            }} placeholder="Enter the password" required/>
            <input type="text" value={phone} onChange={(e)=>{
                 Setphone(e.target.value)
            }} placeholder="Enter the Phone number" required/>
            <button>Regsiter</button>
        </form>
        <Link to="/login">Already have account !</Link>
    </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
    />
    </>
  )
}

export default Register
