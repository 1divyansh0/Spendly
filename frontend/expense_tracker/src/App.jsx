import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Expense from './pages/dashboard/expense'
import Home from './pages/dashboard/home'
import Income from './pages/dashboard/income'
import UserProvider from '../context/UserContext'
import Dash from './Dashboard/dash'
import { Toaster } from "react-hot-toast";


const App = () => {
 
  
  return (
  
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Root/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/expense' element={<Expense/>}/>
      <Route path='/income' exact element={<Income/>}/>
      <Route path='/home' exact element={<Home/>}/>
      <Route path='/dashboard' exact element={<Home/>}/>
      </Routes>
      </BrowserRouter>
       <Toaster position="top-right" />
    </div>
 
  )
}

const Root = ()=>{
  const authenticated = localStorage.getItem("token");

   return (authenticated?(Navigate("/home")):Navigate("/login"))
}

export default App