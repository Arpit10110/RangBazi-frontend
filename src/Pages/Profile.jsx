import React from 'react'
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import Navbar from '../Components/Navbar/Navbar'
import "../Style/Profile.css"
import {useNavigate} from "react-router-dom"
const Profile = () => {
    const Navigate=useNavigate();
    const dispatch =useDispatch();
    const {UserName} = useSelector(state=>state.gambledeatil)
    const {UserPhone} = useSelector(state=>state.gambledeatil)
    const {UserEmail} = useSelector(state=>state.gambledeatil)
    const  logout = ()=>{
        dispatch({
            type: 'logout'
        })
        Navigate("/");
    }
  return (
   <>
   <Navbar/>
    <div className="profile-main">
        <div className="profile-box">
            <h2>Name:-{UserName}</h2>
            <h2>Email:-{UserEmail}</h2>
            <h2>Phone:-{UserPhone}</h2>
            <button onClick={logout} >Logout</button>
        </div>
    </div>
   </>
  )
}

export default Profile
