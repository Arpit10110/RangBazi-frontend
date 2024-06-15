import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import "../Style/Login.css"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
const Login = () => {
  const dispatch = useDispatch();
  const Navigate= useNavigate();
    const [password,Setpassword]=useState("")
    const [email,Setemail]=useState("")
    const login = async (e)=>{
            e.preventDefault()
            try {
              const {data}= await axios.post(`https://rangbazi-backend.onrender.com/login`,{
                email:email,
                password:password
              })
              if(data.success==false){
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
                  Setemail("")
                  Setpassword("")
              }
              else{
                let userdata= data.userdata;
                dispatch({
                  type: "Profile",
                  payload:{
                    name:userdata.name,
                    email:userdata.email,
                    phone:userdata.phone,
                    User_id:userdata._id,
                    wallet:userdata.wallet
                  }
                })
                  Navigate("/");
              }
            } catch (error) {
              console.log(error)
              Setemail("")
              Setpassword("")
            }
    }
  return (
    <>
    <Navbar/>
    <div className="login-main">
        <form onSubmit={login} className="login-box">
            <input  type="email"  value={email}  onChange={(e)=>{
               Setemail(e.target.value)
            }} placeholder='Enter the Email' required/>
            <input type="password" value={password}  onChange={(e)=>{
               Setpassword(e.target.value)
            }} placeholder="Enter the password" required/>
            <button>Login</button>
        </form>
        <Link to="/register">Create new Account</Link>
    </div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  )
}

export default Login
