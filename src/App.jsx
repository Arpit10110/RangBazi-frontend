import React from 'react'
import {HashRouter as Router , Routes, Route} from "react-router-dom"
//Pages
import  Home from "./Pages/Home"
import  Login from "./Pages/Login.jsx"
import Profile from './Pages/Profile'
import  Register from "./Pages/Register.jsx"
import Deposite from './Style/Deposite'
//CSS
import "./Style/Style.css"
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path='/login' element={< Login />} />
      <Route path='/register' element={< Register />} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/deposite' element={<Deposite/>} />
    </Routes>
   </Router>
  )
}

export default App