import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { prepareExpenseLineChartData } from '../../utils/helper';
import axiosInstance from '../../utils/axios';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import { Toaster,toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert ';

const expense = () => {
  
  
     
    const [expenseData, setexpenseData] = useState([])
     const [loading, setloading] = useState(false);
     const [openDeleteAlert, setopenDeleteAlert] = useState({
      show:false,
      data:null
     })
    const [openAddExpenseModal, setopenAddExpenseModal] = useState(false)
  const fetchExpenseDetails = async()=>{
    if(loading)return;
    setloading(true);

    try{
      
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_EXPENSE);

      if(response.data){
        setexpenseData(response.data);
      }
    }catch(err){
      console.error("Something went Wrong !,Please try again!",err)
    }finally{
      setloading(false);
    }
  }
  const handleAddExpense = async(expense)=>{
    const {category, amount,date,icon} = expense;
     if(!category.trim()){
      toast.error("Source is Required!");
      return;
     }

     if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Enter Valid Amount")
     }

     if(!date){
      toast.error("Date is required!");
      return;
     }
      
     try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon,
      })
      setopenAddExpenseModal(false)
      toast.success("Expense Added Finally!")
      fetchExpenseDetails();
     }catch(err){
      console.error("Error adding Expense",err.response?.data?.message || err.message)
     }


      

  };
  const deleteExpense = async(id)=>{
    try{
      await axiosInstance.post(API_PATHS.INCOME.DELETE_EXPENSE(id));
      setopenDeleteAlert({show:false,data:null});
      toast.success("Expense details deleted!");
      fetchExpenseDetails();
    }catch(err){
      console.error("Error Deleting Expense",err.response?.data?.message || err.message);
    }
  };

    const handleDownloadExpenseDetails = async()=>{
      try{
        const res= await axiosInstance.post(API_PATHS.INCOME.DOWNLOAD_EXPENSE,{},{
          responseType:'blob'
        });


        //create url 
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a")
        link.href=url
        link.setAttribute("download","expense_details.xlsx")
        document.body.appendChild(link)
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }catch(err){
        console.error("Error in Downloading Expense Sheet",err);
        toast.error("Failed to Download Please Try Again!")
      }
    }

  
  useEffect(() => {
     fetchExpenseDetails();
   
     return () => {
       
     }
   }, [])
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
             transactions={expenseData}
             onExpenseIncome={()=>setopenAddExpenseModal(true)}
            
            />
          </div>
        </div>
        <ExpenseList
       transactions={expenseData}
       onDelete={(id)=>{
        setopenDeleteAlert({show:true,data:id});
       }}
       onDownload={handleDownloadExpenseDetails}
       />

        <Modal
        isOpen={openAddExpenseModal}
        onClose={()=>setopenAddExpenseModal(false)}
        title="Add Expense">
          <AddExpenseForm
          onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal
       isOpen={openDeleteAlert.show}
       onClose={()=>setopenDeleteAlert({show:false,data:null})}
        title="Delete Expense"
       >
        <DeleteAlert 
        content="Are you sure you want to delete this Expense?"
        onDelete={()=>deleteExpense(openDeleteAlert.data)}
        />
       </Modal>

      </div>
    </DashboardLayout>
  )
}

export default expense