import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from "../../components/Inputs/Input"
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axios'
import { API_PATHS } from '../../utils/apiPaths'
import {UserContext} from '../../../context/UserContext'
import toast from 'react-hot-toast'

const login = () => {
  
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
   const navigate = useNavigate();
  
   const {updateUser} = useContext(UserContext)
    
    const handlelogin = async (e)=>{
      const tid = toast.loading("Connecting you with Spendly!");
      e.preventDefault();
      if(!validateEmail(email)){
        seterror("Please Enter Valid Email!");
        return;
      }

      if(!password){
        seterror("Please Enter Password!");
        return;
      }

      seterror("");

      //Api call for the login
      try{
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,
          password
        });
         console.log(response.data)
         toast.success(`Welcome ${response?.data?.fullName}` ,{id:tid});
        const token_id = response.data?.token_id;
        if(token_id){
          localStorage.setItem("token",token_id);
          updateUser(response.data);
          navigate("/home")
        }
      }catch(err){
        if(err.response && err.response.data.message)
          seterror(err.response.data.message);
        else seterror("Something went Wrong , Please try again!")
      }
    }
  return (
    <AuthLayout>
        <div className='lg:w-[70%] h-3/6  flex flex-col justify-center '>
            <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
            <p className='text-xs text-state-700 mt-[5px] mb-6'>Please enter your details to log in</p>
        


        <form onSubmit={(e)=>handlelogin(e)}>
            <Input
            value ={email} 
            onChange = {(e)=>setemail(e.target.value)}
            label = "Email Address"
            placeholder = "johndoe@gmail.com"
            type = "text"
            />

            <Input
            value ={password} 
            onChange = {(e)=>setpassword(e.target.value)}
            label = "Password"
            placeholder = "Min 8 Characters"
            type = "password"
            />
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type="submit" className='btn-primary'>
                Login
            </button>
            <p className='text-[13px] text-slate-800'>
                Dont have an Account?{" "}
                <Link className='font-medium text-primary underline ' to="/signup">
                SignUp
                </Link>

            </p>
        </form>
        </div>
    </AuthLayout>
  )
}

export default login