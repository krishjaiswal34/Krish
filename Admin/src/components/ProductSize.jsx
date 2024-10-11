import React, { useState } from 'react'

export const ProductSize = ({text,sizes,setSizes}) => {
  console.log("sizes:",sizes)
  
  const [isSelected,setIsSelected]=useState(false)
  return (
    <div onClick={(e)=>{
      
      if(isSelected){
        
        const newSizes=sizes.filter((size)=>size!==text);
        console.log("filtered size",newSizes)

setSizes(newSizes)
setIsSelected(false)
      }else{
        setSizes([...sizes,text])
        setIsSelected(true)
       
      }

    }} className={`px-4 py-2 border-[rgba(0,0,0,0.07)] border-2 bg-[rgba(0,0,0,0.05)] ${isSelected &&'border-2 border-[rgba(0,0,0,0.7)]'}`}>
    {
        text
    }
        </div>
  )
}
