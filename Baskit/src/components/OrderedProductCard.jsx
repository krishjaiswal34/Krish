import React from 'react'
import { formatDate } from '../utils/formatDate';

export const OrderedProductCard = ({orderDetail}) => {
    const {product,shipingInfo,status}=orderDetail;
    const colorChagneofStatus=()=>{
      if(status=='Delivered'){
        return 'bg-[rgba(0,150,0,0.3)]'
      }
      if(status=='Deliver soon'){
        return 'bg-[rgba(0,0,150,0.3)]'
      }
      if(status=='Not delivered'){
        return 'bg-[rgba(150,0,0,0.3)]'
      }
    }
  return (
    <div className=" w-full text-start px-2 py-4 flex justify-between items-center gap-2 ">
    <div className="gap-6 w-2/6 flex items-center justify-center ">
      <div
        
        className="small-image"
      >
        <img src={product.thumbnail} alt="image" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p className="text-lg">${product.price}</p>
        <p>Size:{product.sizeToBuy}</p>
      </div>
    </div>
    <div className='w-1/6 flex items-center justify-center '>
        {
            formatDate(orderDetail.createdAt
                )
        }
    </div>
    <div className={`w-1/6 flex items-center justify-center ${colorChagneofStatus()} px-4 py-2 rounded-full`}>
       {status}
    </div>


  

    
    {/* <DeleteBtn  onclick={()=>removeProductFromUserCart(product_id)}/> */}
  </div>
  )
}

