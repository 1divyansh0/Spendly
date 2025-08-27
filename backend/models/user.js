const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
       type:String,
       required: true
    },
    profileImageUrl:{
        type:String,
        default:null
    }
},{timestamps:true});


//hash password before storing 

UserSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})


//Compare Password

UserSchema.methods.comparePassword = async function(candidate_password){
    return await bcrypt.compare(candidate_password,this.password);
}

module.exports = mongoose.model("User",UserSchema);