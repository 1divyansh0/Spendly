import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"



const Input = ({value , label, placeholder, onChange , type}) => {
 const [showpassword, setshowpassword] = useState(false);
 
  const toggle = ()=>{
    
    setshowpassword(!showpassword);
  }
  return (
    <div >
        <h3 className='text-[13px] text-slate-800'>{label}</h3>
        <div className='input_box'>
         <input 
         className='w-full bg-transparent outline-none'
         type = {(type==="password" && showpassword)?"text":type}
         value ={value}
         onChange={(e)=>onChange(e)}
         placeholder={placeholder}
         />
          

        {type=="password" ? <>{ showpassword?
        <FaRegEye size={22} className="text-primary cursor-pointer"
          onClick = {()=>toggle()}/>:
         <FaRegEyeSlash size={22} className="text-primary cursor-pointer"
          onClick = {()=>toggle()}/>
         }</>:""}
         </div>
         
    </div>
  )
}

export default Input