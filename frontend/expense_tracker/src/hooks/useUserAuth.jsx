import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios"
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = ()=>{

    const {user,updateUser,clearuser} = useContext(UserContext);
    const navigate = useNavigate();

     useEffect(()=>{
        if(user)return ;
        let isMounted = true;

        const fetchUserInfo = async ()=>{
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if(isMounted && response.data){
                    updateUser(response.data);
                    console.log(response?.data)
                }
            }catch(err){
               console.log("Failed to fetch user Info",err);
               if(isMounted){
                clearuser();
                navigate("/login");
               } 
            }
        };
        fetchUserInfo();

        return ()=>{
            isMounted = false;

        }
     },
     [updateUser,clearuser,navigate]
    
    )
};