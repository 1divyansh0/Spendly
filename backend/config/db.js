const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI,{}) ;
       console.log("DB is Connected!");
    }catch(err){
        console.log("Error Occurred!"+err)
    }
}

module.exports = connectDB