import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:1000000,
    headers:{
        
    "Accept":"application/json",
    },
});

//Request Interceptor 
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//Response Inceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        //Handle Common errors Globally
        if(error.response){
            if(error.response.status===401){
                //Redirect to login page 
                window.location.href='/login';
            }else if(error.response.status===500){
                console.error("Server Error , Please try again Later!")
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("Request Timeout,Please Try again")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;