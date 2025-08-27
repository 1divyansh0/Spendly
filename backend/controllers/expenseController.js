const xlsx = require('xlsx');
const User = require("../models/user");
const Expense = require("../models/expense")

exports.addExpense = async(req,res)=>{  
    const userId = req.user._id;
    try{
        const {icon,category,amount,date} = req.body;

        //validate :
        if(!category || !amount || !date || !icon)
            return res.status(400).json({
        message: "All Fields are Reuqired!"
        })

        const newExpense = new Expense({
             userId,
             icon,
             category,
             amount,
             date: new Date(date)

        });

        await newExpense.save();
        res.status(200).json(newExpense)
    }catch(error){
       res.status(500).json({
        message: "server Error"+error.message
       }) 
    }

}

exports.getAllExpense = async(req,res)=>{
    const userid = req.user._id;

    try{
        const expense = await Expense.find({userId:userid}).sort({date:-1});
        res.status(200).json(expense);
    }catch(err){
        res.status(500).json({
            message:"Server Error"+err.message
        })
    }

} 

exports.deleteExpense = async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully!"})
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }

}
exports.downloadExpenseExcel = async (req,res)=>{
    const userid = req.user._id;


    try{

        const expense = await Expense.find({userId:userid}).sort({date:-1});
        const data = expense.map((item)=>({
            Category: item.category,
            Amount: item.amount,
             Date: item.date.toISOString().split("T")[0]
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } 
    catch(err){
      res.status(404).json({
        message:"Error"+err.message
      })
    }

}