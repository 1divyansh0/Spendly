 import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import Profilephotoselector from '../../components/Inputs/Profilephotoselector';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axios';
import { UserContext } from '../../../context/UserContext';
import uploadImage from '../../utils/uploadimages';



 
 const signup = () => {
  
  
  
   const [fullname, setfullname] = useState("");
   const [profilepic, setprofilepic] = useState("");
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
   const [error, seterror] = useState("");

   const {updateUser} = useContext(UserContext)

   const navigate = useNavigate();

   const handlesignup = async(e)=>{  
    e.preventDefault();
    if(!validateEmail(email)){
      seterror("Enter Proper Email Address!")
      return
    }

    if(!password){
      seterror("Enter Password!");
      return
    }


    //Api call;

    try{
         //Upload image if present
         const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          fullName:fullname,
          email,
          password,
         })
         
        const {user,token} = res.data

        if(token){
          localStorage.setItem("token",token);
          updateUser(user);
          navigate("/home")
        }
         
         let profileImageUrl = "";
         if(profilepic){
          const imgUpload = await uploadImage(profilepic);
          profileImageUrl = imgUpload.imageUrl || ""
          const updateduser = {
            ...user,
            profileImageUrl
          }
          updateUser(updateUser)
         }
      }catch(err){
        if(err.response && err.response.data.message)
          seterror(err.response.data.message);
        else seterror("Something went Wrong , Please try again!"+err)
      }

   }
  
   return (

    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your  details below
        </p>
        <form onSubmit={handlesignup}>

          <Profilephotoselector image={profilepic} setimage = {setprofilepic}/>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
            value = {fullname}
            onChange={(e)=>setfullname(e.target.value)}
            label = "Full Name"
            placeholder="John Doe"
            />
            <Input 
            value = {email}
            onChange={(e)=>setemail(e.target.value)}
            label = "Enter Email"
            placeholder="JohnDoe@gmail.com"
            />
            <div className='col-span-2'>
            <Input 
            value = {password}
            onChange={(e)=>setpassword(e.target.value)}
            label = "Password"
            placeholder="Min 8 Characters"
            type="password"
            />
            </div>
           

          </div>
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type="submit" className='btn-primary'>
                Signup
            </button>

                <p className='text-[13px] text-slate-800'>
                Already have an Account?{" "}
                <Link className='font-medium text-primary underline ' to="/login">
                Login
                </Link>

            </p>


        </form>  

      </div>

      

    </AuthLayout>
     
   )
 }
 
 export default signup