import React, { useRef, useState } from 'react'
import { LuUser,LuTrash,LuUpload } from 'react-icons/lu';


const Profilephotoselector = ({image,setimage}) => {
    const [previewUrl, setpreviewUrl] = useState("")
    const inputRef = useRef(null);


    const handleimagechange = (e)=>{
        const file = e.target.files[0];
        if(file){
            //set image
            setimage(file);

            const preview = URL.createObjectURL(file)
            setpreviewUrl(preview);
            
        }
    }

    const removeimage = ()=>{
        setimage(null);
        setpreviewUrl(null);
    }

    const onchoose = ()=>{
        inputRef.current.click();
    }

  return (
    <div className='flex justify-center mb-6'>
        <input 
        type="file"
        ref={inputRef}
        accept='image/*'
        onChange={handleimagechange}
         className='hidden'
        />

        {!image?(
            <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
             <LuUser className='text-4xl text-primary'/>
            <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onchoose}
            
            >
                <LuUpload/>
            </button>
            
            </div>
        ):(
        <div className='relative '>
            <img src={previewUrl} alt="profile_photo" className='w-20 h-20 rounded-full object-cover' />
            <button
            type="button"
            className='w-8 h-8 flex justify-center items-center bg-re-500 text-white bg-red-500 rounded-full absolute -bottom-1 -right-1'
            onClick={removeimage}
            >
             <LuTrash/>
            </button>
            
            
            </div>

        )}
    

    </div>
  )
}

export default Profilephotoselector