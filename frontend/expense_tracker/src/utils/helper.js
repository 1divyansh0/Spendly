import moment from "moment"

export const validateEmail =(email)=>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const addThousandsSeparator = (num)=>{
  if(num==null || isNaN(num))return "";

  const [integerPart,fractionPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return fractionPart?`${formattedInteger}.${fractionPart}`:formattedInteger;
};

export const prepareExpenseBarChartData = (data=[])=>{
  const chartData = data.map((item)=>(
    {
      category:item?.category,
      amount:item?.amount,
      month: moment(item?.date).format("MMM YYYY")
    }
  ));

  return chartData;
}
export const prepareIncomeBarChartData=(data=[])=>{
  const sortedData = [...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const charData = sortedData.map((item)=>{
    return {month: moment(item?.date).format('Do MMM YYYY'),
    amount: item?.amount,
    source: item?.source}
  })

  return charData;
}
export const prepareExpenseLineChartData=(data=[])=>{
  const sorteddata = [...data].sort((a,b)=>new Date(a.date)-new Date(b.date));

  const chartData = sorteddata.map((item)=>(
   { month:moment(item?.date).format("Do MMM YYYY"),
    amount:item?.amount,
    category:item?.category}
  ))
  return chartData
}