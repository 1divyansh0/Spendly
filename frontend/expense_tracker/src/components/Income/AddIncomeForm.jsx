import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome }) => {


    const [income, setincome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    })
    const handleChange = (key,value)=>setincome({...income,[key]:value})
  return (
    <div>
        
        <h3 className='text-lg px-3 mb-5 mt-2'>Add Income Form</h3>
        <div className='p-4'>
        <EmojiPickerPopup
        className=''
         icon={income.icon}
         onSelect={(selectIcon)=>handleChange("icon",selectIcon)}/>

        </div>
        <div className='p-4'>
       <Input
       value={income.source}
       onChange={(e)=>{
        
        handleChange("source",e.target.value)
        }
    }
       label="Income Source"
       placeholder="Freelance , Salary , Etc"
       type="text"
       
       /> 

        <Input
       value={income.amount}
       onChange={(e)=>handleChange("amount",e.target.value)}
       label="Amount"
       placeholder=""
       type="number"
       
       /> 

        <Input
       value={income.date}
       onChange={({target})=>handleChange("date",target.value)}
       label="Date"
       placeholder=""
       type="date"
       
       /> 

       <div className='flex justify-end mt-6'>
       <button
       type='button'
       className='add-btn add-btn-fill'
       onClick={()=>onAddIncome(income)}>
        Add Income
       </button>

       </div>

        </div>
    </div>
  )
}

export default AddIncomeForm