import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'
import Input from '../Inputs/Input'

const AddExpenseForm = ({onAddExpense}) => {
      
       const [expense, setexpense] = useState({
           category:"",
           amount:"",
           date:"",
           icon:"",
       })
       const handleChange = (key,value)=>setexpense({...expense,[key]:value})
     return (
       <div>
           
           <h3 className='text-lg px-3 mb-5 mt-2'>Add Income Form</h3>
           <div className='p-4'>
           <EmojiPickerPopup
           className=''
            icon={expense.icon}
            onSelect={(selectIcon)=>handleChange("icon",selectIcon)}/>
   
           </div>
           <div className='p-4'>
          <Input
          value={expense.category}
          onChange={(e)=>{
           
           handleChange("category",e.target.value)
           }
       }
          label="Category"
          placeholder="Fees,Shopping,Food, Etc"
          type="text"
          
          /> 
   
           <Input
          value={expense.amount}
          onChange={(e)=>handleChange("amount",e.target.value)}
          label="Amount"
          placeholder=""
          type="number"
          
          /> 
   
           <Input
          value={expense.date}
          onChange={({target})=>handleChange("date",target.value)}
          label="Date"
          placeholder=""
          type="date"
          
          /> 
   
          <div className='flex justify-end mt-6'>
          <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={()=>onAddExpense(expense)}>
           Add Expense
          </button>
   
          </div>
   
           </div>
       </div>
     )
}


export default AddExpenseForm