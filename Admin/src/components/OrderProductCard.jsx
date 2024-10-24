import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faSave} from '@fortawesome/free-regular-svg-icons'
import { AdminContext } from '../contexts/adminContext';
const OrderProductCard = ({order}) => {
    const {product,shipingInfo,status
    }=order;
    const [orderStatus,setOrderStatus]=useState(status);
const {updateOrderStatus}=useContext(AdminContext);

    const colorChagneofStatus=()=>{
      if(orderStatus=='Delivered'){
        return 'bg-[rgba(0,150,0,0.3)]'
      }
      if(orderStatus=='Deliver soon'){
        return 'bg-[rgba(0,0,150,0.3)]'
      }
      if(orderStatus=='Not delivered'){
        return 'bg-[rgba(150,0,0,0.3)]'
      }
    }



  return (
    <div className="h-[100px] text-start px-4  flex justify-between items-center gap-2 border-2  ">
      <div className="gap-6 w-2/6 h-full flex items-center justify-center ">
        <div className="h-full">
          <img className="h-full" src={product.thumbnail} alt="image" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-lg">${product.price}</p>
         
        </div>
      </div>

<select onChange={(e)=>setOrderStatus(e.target.value)} value={orderStatus}  className={`relative w-1/6 flex items-center justify-center  ${colorChagneofStatus()} px-4 py-2 rounded-full `}>
      
        <option>Delivered</option>
        <option>Deliver soon</option>
        <option>Not delivered</option>

       
    </select>


<FontAwesomeIcon className='cursor-pointer' onClick={()=>updateOrderStatus(order._id
,orderStatus)} icon={faSave}/>



    </div>
  )
}

export default OrderProductCard