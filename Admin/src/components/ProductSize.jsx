import React, { useState } from 'react'

export const ProductSize = ({text,sizes}) => {
  console.log("sizes:",sizes)
  const [isSelected,setIsSelected]=useState(false)
  return (
    <div onClick={(e)=>{
      
      if(isSelected){
        sizes.delete(text)
        setIsSelected(false)
      }else{
        sizes.add(text)
        setIsSelected(true)
        onValueChange(e);
      }

    }} className={`px-4 py-2 border-[rgba(0,0,0,0.07)] border-2 bg-[rgba(0,0,0,0.05)] ${isSelected &&'border-2 border-[rgba(0,0,0,0.7)]'}`}>
    {
        text
    }
        </div>
  )
}
