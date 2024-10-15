import React, { useContext, useEffect, useState } from 'react'
import { SmallImage } from './SmallImage/SmallImage'
import {ProductContext} from '../contexts/ProductContext'
import Delete from '@mui/icons-material/Delete'
import { DeleteBtn } from './DeleteBtn/DeleteBtn'
const CartItemCard = ({product,product_id,sizeToBuy,quantityToBuy,setEachProductTotalPrice}) => {

console.log("product",product,"product_id:",product_id)
   
    const thumbnail=product?.thumbnail;
    const price=parseInt(product?.price)
    console.log("priceiie:",price)
    const name=product?.name
    const [productQuantity,setProductQuantity]=useState(quantityToBuy);
    const {removeProductFromUserCart,updateCartProduct} =useContext(ProductContext)
    const totalPrice=productQuantity*price;

    useEffect(()=>{
      setEachProductTotalPrice(preve=>({...preve,[product_id]:{price,productQuantity}}))
    },[productQuantity,product])
    

 
  return (
    <div className='border-t-2 border-b-2 w-full text-start px-2 py-4 flex justify-between items-center'>

<div className='flex gap-6'>
<SmallImage image={thumbnail} />
<div className='flex flex-col gap-2'>
    <h1 className='text-xl font-semibold'>{name}</h1>
    <p className='text-lg'>${price}</p>
    <p>Size:{sizeToBuy}</p>
</div>
</div>



<div className='flex gap-4 items-center'>
  <p onClick={()=>setProductQuantity(productQuantity>1?productQuantity-1:productQuantity)} className='text-[30px] font-semibold cursor-pointer'>-</p> <div className='h-[40px] w-[50px] border-2 border-[rgba(0,0,0,0.5)] rounded-s flex justify-center items-center'>{productQuantity}</div> <p onClick={()=>setProductQuantity(productQuantity+1)} className='text-[30px] font-semibold cursor-pointer'>+</p>
</div>
<p>${totalPrice}</p>
<button onClick={()=>updateCartProduct(product_id,productQuantity)} className='border-2  px-3 py-1 rounded-full bg-[rgba(0,0,0,0.7)] text-white'>Save changes</button>
{/* <div onClick={()=>removeProductFromUserCart(product_id)}>
  
  <Delete   className='text-xl cursor-pointer'/>
  
  
  </div> */}

<DeleteBtn onclick={()=>removeProductFromUserCart(product_id)}/>

    </div>
  )
}

export default CartItemCard