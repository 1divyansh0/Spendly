const jwt = require("jsonwebtoken"); 
const User = require("../models/user");

//generate jwt token 
const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}


exports.registerUser = async(req,res)=>{

    const {
        fullName,
         email,
         password,
         profileImageUrl
    }  = req.body;
     
    if(!fullName || !email || !password)
        return res.status(400).json({message:"Plesse Enter All Fields!"})

    
    try{
        const existinguser = await User.findOne({email});
    
        if(existinguser)throw new Error("Email Already Existed!");
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        res.status(201).json({
            user,
            token: generateToken(user._id)
        });
    }catch(err){
        res
        .status(500)
        .json({
            message: `${err}`
        })
    }

};

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password)
        return res.status(500).json({
         message:"Every Field Required!"
    })
   try{
    const user = await User.findOne({
        email
    })

    if(!user || !(await user.comparePassword(password)))return res.status(500).json({
        message:"User Not Exist"
    })

    res.status(200).json({
        id:user._id,
        fullName: user.fullName,
        email : user.email,
        password: user.password,
        token_id : generateToken(user._id)
    })
    }catch(err){
        res.status(500).json({
            message:"Error:"+err.message
        })
    }
    



};

exports.getUserInfo = async(req,res)=>{
    try{
        const user =await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({
            message: " User Not Found!"
            })
        }
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({
            message:"Error in GettingInfo:"+err.message
        })

    }
};
