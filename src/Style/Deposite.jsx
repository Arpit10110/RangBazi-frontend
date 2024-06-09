import React,{useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import "../Style/Deposite.css"
import Qr from "../assets/QR.jpg"
import {v4} from "uuid"
import { imgdb } from '../Firebase'
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';
import axios from 'axios'
import {useSelector}from "react-redux"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Deposite = () => {
    const {UserName} = useSelector(state=>state.gambledeatil)
    const { User_id} = useSelector(state=>state.gambledeatil)
    const {UserEmail} = useSelector(state=>state.gambledeatil)
    const [amount,Setamount]=useState("");
    const [transId,SettransId]=useState("");
    const [imgup,Setimgup]=useState(false);
    const [proof,Setproof]=useState("");
    const Sentdeposite =async(e)=>{
        e.preventDefault()
        if(imgup==true)
        {
            toast.warn("Please wait image is uploading", {
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
        else{
            try {
                const {data}= await axios.post("http://localhost:4000/sentdeposite",{
                        email:UserEmail,
                        name:UserName,
                        userid:User_id,
                        amount:amount,
                        transid:transId,
                        imgurl:proof,
                        pending:true
                })
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    Setamount("");
                    SettransId("");
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
    }
    const uploadImg =(e)=>{
        Setimgup(true)
        const img=ref(imgdb,`images/${v4()}`)
        uploadBytes(img,e.target.files[0]).then(data=>{
          getDownloadURL(data.ref).then(val=>{
            Setproof(val)
            Setimgup(false)
            toast.success("Image Uploaded", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          })
        })
      }
  return (
   <>
   <Navbar/>
   <div className="deposite-main">
        <form onSubmit={Sentdeposite} className="deposite-box">
            <img src={Qr} alt="8840689883@paytm" />
            <input type="text" value={amount} onChange={(e)=>{
                Setamount(e.target.value)
            }} placeholder='Enter the Amount ₹' required />
            <input type="text" value={transId} onChange={(e)=>{
                SettransId(e.target.value)
            }} placeholder='Enter the Transaction ID'  required />
            <input type="File"  onChange={(e)=>{uploadImg(e)}} />
            <button>Deposite</button>
        </form>
   </div>
   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
   </>
  )
}

export default Deposite
