import React from 'react'
import { Link} from "react-router-dom"
import "./Navbar.css"
import {useSelector} from "react-redux"
const Navbar = () => {
    const {User_id} = useSelector(state=>state.gambledeatil);
    const {Wallet} = useSelector(state=>state.gambledeatil);
  return (
   <>
    <nav>
        <div className="logo">
            <h3>RangBazi</h3>
        </div>
        <div className="wallet">
            Wallet-₹{Wallet}
        </div>
        <div className="nav-Link">
                <Link to="/">Home</Link>
                <Link to="/deposite">Deposit</Link>
                <Link>withdrawal</Link>
                <Link>Contact</Link>
                {
                    User_id==""? <Link to="/login">Login</Link>: <Link to="/profile">Profile</Link>
                }
               
        </div>
    </nav>
   </>
  )
}

export default Navbar