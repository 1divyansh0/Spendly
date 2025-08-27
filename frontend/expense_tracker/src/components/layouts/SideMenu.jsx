import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../../context/UserContext'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast'

const SideMenu = ({activeMenu}) => {
  console.log(activeMenu);
  const {user,clearuser} = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.clear();
    clearuser();
   toast.success("See You NextTime!")
    navigate("/login");
  }

  const handleClick = (route)=>{
    if(route=="/logout"){
      handleLogout();
      return;
    }
    navigate(route);
  }
  return <div className='w-64 h-[calc(100vh-61px)] bg-white p-5'>
    <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
      {user?(
        <img src={user?.profileImageUrl ||"https://cdn.vectorstock.com/i/500p/17/84/cute-young-man-avatar-character-cartoon-style-vector-36211784.jpg"}
        alt='Profile Image'
        className='W-20 h-20 rounded-full'/>):<></>
      }
      <h5 className='text-gray-950 font-medium leading-6 mt-3'>
       {user?.fullName || ""}
      </h5>
    </div>

    {SIDE_MENU_DATA.map((item,index)=>{
      return <button
      key={`menu_${index}`}
      className={`w-full flex items-center gap-4 text-[15px] ${
        activeMenu===item.label?"text-white bg-primary":""
      } py-3 px-6 rounded-lg mb-3`}
      onClick={()=>handleClick(item.path)}
      >
      <item.icon className='text-xl'/>
      {item.label}
      </button>
    })}

  </div>
}

export default SideMenu