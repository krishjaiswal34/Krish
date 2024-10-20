import React from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../../assets/Images//b10.jpg'
import './ShopPage.css'
export const ShopPage = () => {
   
  return (
   <div className='w-full'>

<div className='h-[200px] w-full border-[1px] border-black flex bg-contain banner object-cover' >
<img className='object-cover' src={banner}/>

</div>

   </div>
  )
}
