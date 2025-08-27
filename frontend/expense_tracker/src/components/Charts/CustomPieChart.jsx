import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import customTooltip from './customTooltip';
import customLegend from './customLegend';



const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
  return (
    <ResponsiveContainer className="mt-6" width="100%" height={400}>
        <PieChart className='mt-5'>
            <Pie 
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            >
            {data.map((entry,index)=>{
                return <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
            })

            }

            </Pie>
            <Tooltip content={customTooltip}/>
            <Legend content={customLegend}/>
            {showTextAnchor && (
                <>
                <text 
                x="50%"
                y="50%"
                dy={-25}
                textAnchor='middle'
                fill="#333"
                fontSize="24px"
                fontWeight="semi-bold"
                >
                {label}
                </text>
                <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor='middle'
                fontSize="24px"
                fontWeight="semi-bold"
                >
                {totalAmount}
                </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart