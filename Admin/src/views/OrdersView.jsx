import React, { useEffect, useState } from 'react'
import ListedProductCard from '../components/ListedProductCard'
import OrderProductCard from '../components/OrderProductCard'
import { useContext } from 'react'
import { AdminContext } from '../contexts/adminContext'

export const OrdersView = () => {
  
const {orders}=useContext(AdminContext);

  return (
    <div className="py-6 px-10 text-start flex flex-1 flex-col gap-4">


{
  orders.length>0
  ?orders.map((order)=>{

    return <OrderProductCard order={order}/>

  }):<p>No  Ordered products</p>

  
}
    
    
    
    </div>
  )
}
