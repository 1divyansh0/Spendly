const express = require("express");
const Income = require("../models/income");
const Expense = require("../models/expense");
const {protect} = require("../middleware/authMiddleware");
const {isValidObjectId,Types} = require("mongoose");

//DashBoard
exports.getDashboardData = async (req,res)=>{
    try{
        const userid = req.user._id;
        const userObjectId = new Types.ObjectId(String(userid));

        //Fetch Total Income
        const totalIncome = await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}},
        ])

        const totalExpense = await Expense.aggregate([
              {$match:{userId: userObjectId}},
              {$group:{_id:null,total:{$sum:"$amount"}}}
        ])


        //Get income transactions in the last 60 days

        const last60daysIncomeTransactions = await Income.find({userId:userid,
            date:{$gte:new Date(Date.now()-60*24*60*60*1000)},

        }).sort({date:-1});
        const incomeLast60days = last60daysIncomeTransactions.reduce((sum,txn)=>sum+txn.amount,0);

        //Get Expense Transaction in last 30days;

        const last30daysExpenseTransactions = await Expense.find({
            userId:userid,
            date:{
                $gte: new Date(Date.now()-30*24*60*60*1000)
            }
        }).sort({date:-1});

        //getTotal expenses
        console.log(last30daysExpenseTransactions);
        const expenseLast30days = last30daysExpenseTransactions.reduce((sum,trans)=>sum+trans.amount,0);

        //Fetch last 5 transactions (income+expenses)
        const lastTransaction = [
            ...(await Income.find({userId:userid}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"income"
                })
            ),
            ...(await Expense.find({userId:userid}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b)=>a.date-b.date);

        //Final Response
        res.json({
            totalBalance:(totalIncome[0]?.total ||0)-(totalExpense[0]?.total||0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total||0,
            last30DaysExpenses : {
                total:expenseLast30days,
                transactions:last30daysExpenseTransactions
            },
            last60DaysIncome:{
                total:incomeLast60days,
                transactions:last60daysIncomeTransactions
            },
            recentTransactions : lastTransaction,

        });

    }catch(err){
        res.status(505).json({
            message:"Error occured"+err.message
        })
    }
}
