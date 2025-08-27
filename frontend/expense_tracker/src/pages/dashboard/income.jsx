import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axios'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import Input from '../../components/Inputs/Input'
import { Toaster, toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/layouts/DeleteAlert '
import { useUserAuth } from '../../hooks/useUserAuth'

const income = () => {
  useUserAuth()
  
  
  const [incomeData, setincomeData] = useState([])
   const [loading, setloading] = useState(false);
   const [openDeleteAlert, setopenDeleteAlert] = useState({
    show:false,
    data:null
   })
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

 
  //Get All Income Details
  const fetchIncomeDetails = async()=>{
    if(loading)return;
    setloading(true);
    

    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      console.log(response?.data)

      if(response.data){
        setincomeData(response.data);
      }
    }catch(err){
      console.log("Something went Wrong !,Please try again!")
    }finally{
      setloading(false);
    }
  }
  const handleAddIncome = async(income)=>{
    const {source , amount,date,icon} = income;
     if(!source.trim()){
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      })
      setOpenAddIncomeModal(false);
      toast.success("Income Added Finally!")
      fetchIncomeDetails();
     }catch(err){
      console.error("Error adding Income",err.response?.data?.message || err.message)
     }


      

  };
  const deleteIncome = async(id)=>{
    try{
      await axiosInstance.post(API_PATHS.INCOME.DELETE_INCOME(id));
      setopenDeleteAlert({show:false,data:null});
      toast.success("Income details deleted!");
      fetchIncomeDetails();
    }catch(err){
      console.error("Error Deleting Income",err.response?.data?.message || err.message);
    }
  };
  const handleDownloadIncomeDetails = async()=>{
  try{
        const res= await axiosInstance.post(API_PATHS.INCOME.DOWNLOAD_INCOME,{},{
          responseType:'blob'
        });


        //create url 
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a")
        link.href=url
        link.setAttribute("download","income_details.xlsx")
        document.body.appendChild(link)
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }catch(err){
        console.error("Error in Downloading Income Sheet",err);
        toast.error("Failed to Download Please Try Again!")
      }

  }

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
      
    }
  }, [])
  
  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
       <div className='grid grid-cols-1 gap-6'>
         <div>
          <IncomeOverview
           transactions = {incomeData}
           onAddIncome={()=>setOpenAddIncomeModal(true)}
           />
         </div>
       </div>
       <IncomeList
       transactions={incomeData}
       onDelete={(id)=>{
        setopenDeleteAlert({show:true,data:id});
       }}
       onDownload={handleDownloadIncomeDetails}
       />
       <Modal
       isOpen={OpenAddIncomeModal}
       onClose={()=>setOpenAddIncomeModal(false)}
       title="Add Income"
       >
        
         <AddIncomeForm className='' 
         onAddIncome={handleAddIncome}/>
       </Modal>
       <Modal
       isOpen={openDeleteAlert.show}
       onClose={()=>setopenDeleteAlert({show:false,data:null})}
        title="Delete Income"
       >
        <DeleteAlert 
        content="Are you sure you want to delete this income?"
        onDelete={()=>deleteIncome(openDeleteAlert.data)}
        />
       </Modal>

      </div>
    </DashboardLayout>
  )
}

export default income