import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axios";


const uploadImage = async (imageFile)=>{
    const formdata = new FormData();
    formdata.append('image',imageFile);
    try{
        const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
            headers:{
                 ...axiosInstance.defaults.headers.common,
                'Content-Type':'multipart/form-data'
            },
        })
        return res.data;
    }catch(err){
        console.error('Error Uploading the image',err);
        throw err;
    }
}

export default uploadImage;