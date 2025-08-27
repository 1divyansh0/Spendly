import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../Card/InfoCard';
import {LuHandCoins,LuWalletMinimal} from "react-icons/lu"
import {IoMdCard} from "react-icons/io"
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/last30DaysExpenses';
import RecentIncomewithCharts from '../../components/Charts/RecentIncomewithCharts';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import toast from 'react-hot-toast';
const Home = () => {
  
  
 
  useUserAuth();
  const navigate = useNavigate();
  const [Dashboard, setDashboard] = useState(null)
  const [loading, setloading] = useState(false);

  const fetchDashboardData = async()=>{
    const tid = toast.loading("Loading Dashboard!")
    if(loading)return;

    setloading(true);
    try{
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if(response.data)
        setDashboard(response.data);

     toast.success("Dashboard Loaded!",{id:tid})
    }catch(err){
      console.log("Something wennt wrong Please Try Again",err);
     
    }finally{
      setloading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  
    return () => {
      
    }
  }, [])
  
  
  
  return (
    <DashboardLayout className="p-3" activeMenu="Dashboard">
    <div className='my-5  mx-auto md:mx-5'>
      <div className='mb-3 grid grid-cols-1 md:grid-cols-3 gap-6'>
       <InfoCard 
       icon = {<IoMdCard/>}
       label=  "Total Balance"
       value = {addThousandsSeparator(Dashboard?.totalBalance || 0)}
       color="bg-primary"
       />
        <InfoCard 
       icon = {<IoMdCard/>}
       label=  "Total Income"
       value = {addThousandsSeparator(Dashboard?.totalIncome || 0)}
       color="bg-orange-500"
       />
      <InfoCard 
       icon = {<IoMdCard/>}
       label=  "Total Expense"
       value = {addThousandsSeparator(Dashboard?.totalExpense   || 0)}
       color="bg-red-500"
       />
      </div>
       
       

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
       <RecentTransactions 
       transactions = {Dashboard?.recentTransactions}
       onSeeMore={()=>navigate("/expense")}/>

       <FinanceOverview 
       totalBalance={Dashboard?.totalBalance || 0}
       totalIncome={Dashboard?.totalIncome ||0}
       totalExpense = {Dashboard?.totalExpense || 0} />
        

      <ExpenseTransactions
      transactions={Dashboard?.last30DaysExpenses?.transactions}
      onSeeMore={()=>navigate("/expense")}
      />

     <Last30DaysExpenses
      data={Dashboard?.last30DaysExpenses?.transactions}/>
       
       <RecentIncomewithCharts 
       data={Dashboard?.last60DaysIncome?.transactions.slice(0,5) || []}
       totalIncome={Dashboard?.totalIncome || 0}/>
      
       <RecentIncome
       transactions={Dashboard?.last60DaysIncome.transactions || []}
       onSeeMore={()=>navigate("/income")}
        />
    
       </div>
    </div>

    </DashboardLayout>
  )
}

export default Home