import React from 'react'
import Cart from '@mui/icons-material/ShoppingCartOutlined'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'

export const CartIcon = () => {
  const {cartProducts}=useContext(ProductContext)
  console.log("cart products:",cartProducts)
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate('cart')} className='relative cursor-pointer'>
        <Cart className='text-xl'/>
        <span className='bg-black text-white rounded-full h-4 w-4 flex justify-center items-center absolute left-[50%] bottom-0 text-[12px] font-semibold'>
            {
              cartProducts?cartProducts.length:0
            }
        </span>
    </div>
  )
}
