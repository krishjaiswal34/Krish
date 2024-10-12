import React, { useEffect, useState } from 'react'
import { SmallImage } from './SmallImage/SmallImage'

import Delete from '@mui/icons-material/Delete'
const CartItemCard = ({product}) => {

    const {thumbnail,price,name}=product
 
  return (
    <div className='border-t-2 border-b-2 w-full text-start px-2 py-4 flex justify-between items-center'>

<div className='flex gap-6'>
<SmallImage image={thumbnail} />
<div className='flex flex-col gap-4'>
    <h1 className='text-xl font-semibold'>{name}</h1>
    <p className='text-lg'>${price}</p>
</div>
</div>

<input name='quantity' type='number' min={0} defaultValue={1} className='border-2 h-10 w-16 text-center border-[rgba(0,0,0,0.4)] rounded-s' />

<Delete className='text-xl cursor-pointer'/>

    </div>
  )
}

export default CartItemCard