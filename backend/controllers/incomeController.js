const xlsx = require('xlsx');
const User = require("../models/user");
const Income = require("../models/income")

exports.addIncome = async(req,res)=>{  
    const userId = req.user._id;
    console.log(userId)
    try{
        const {icon,source,amount,date} = req.body;

        //validate :
        if(!source || !amount || !date || !icon)
            return res.status(400).json({
        message: "All Fields are Reuqired!"
        })

        const newIncome = new Income({
             userId,
             icon,
             source,
             amount,
             date: new Date(date)

        });

        await newIncome.save();
        res.status(200).json(newIncome)
    }catch(error){
       res.status(500).json({
        message: "server Error"+error.message
       }) 
    }

}

exports.getAllIncome = async(req,res)=>{
    const userid = req.user._id;

    try{
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
        const income = await Income.find({userId:userid}).sort({date:-1});
        res.status(200).json(income);
    }catch(err){
        res.status(500).json({
            message:"Server Error"+err.message
        })
    }

} 

exports.deleteIncome = async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully!"})
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }

}
exports.downloadIncomeExcel = async(req,res)=>{
    const userid = req.user._id;


    try{

        const income =  await Income.find({userId:userid}).sort({date:-1});
        const data = income.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0]
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx');
    } 
    catch(err){

    }

}