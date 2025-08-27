import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'

import moment from 'moment'
import TrsanctionInfoCard from '../../Card/TrsanctionInfoCard'


const ExpenseTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
     <div className='flex items-center justify-between'>
       <h5 className='text-lg'>Expanses</h5>

       <button className='card-btn' onClick={onSeeMore}>
         see All <LuArrowBigRight className='text-base'/>
       </button>
     </div>
       <div className='mt-6'>
       {transactions?.slice(0,5)?.map((expense)=>(
        <TrsanctionInfoCard
        key = {expense._id}
        tittle={expense.category}
        icon={expense.icon}
        date={moment(expense.date).format("Do MMM YYYY")}
        amount={expense.amount}
        type="expense"
        hideDeleteBtn
        />
       ))}
       </div>

    </div>
  )
}

export default ExpenseTransactions