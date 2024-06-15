import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
import { useSelector } from "react-redux"
import axios from "axios"
import Drawer from "@mui/material/Drawer";
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { User_id } = useSelector(state => state.gambledeatil);
    const [Wallet, SetWallet] = useState(0)

    const walletvalue = async () => {
        try { 
            const { data } = await axios.post("https://rangbazi-backend.onrender.com/walletvalue", {
                id: User_id
            })
            SetWallet(data.wallet);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (User_id === "") {
            console.log("Please login")
        } else {
            walletvalue();
            const intervalId = setInterval(walletvalue, 3000); 
            return () => clearInterval(intervalId);
        }
    }, [User_id]) 

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
                    <Link to="/withdrawal">Withdrawal</Link>
                    <Link>Contact</Link>
                    {
                        User_id === "" ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>
                    }
                </div>
                <div className="mobile-links">
        <button 
          onClick={() => {
            setOpen(true);
          }}
        >
         <MenuIcon className="MenuIcon"/>
        </button>
        <Drawer
          anchor={"right"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="all-links">
            <Link to="/" onClick={() => {
            setOpen(false);
          }} >Home</Link>
            <Link to="/deposite" onClick={() => {
            setOpen(false);
          }}>Deposit</Link>
            <Link to="/withdrawal" onClick={() => {
            setOpen(false);
          }}>Withdrawal</Link>
            <Link to="" onClick={() => {
            setOpen(false);
          }}>Contact</Link>
           {
                        User_id === "" ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>
           }
          </div>
        </Drawer>
      </div>
            </nav>
        </>
    )
}

export default Navbar;
