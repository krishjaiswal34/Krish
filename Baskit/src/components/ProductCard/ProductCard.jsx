import React from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'

export const ProductCard = ({name,price,thumbnail , productVeiwClick}) => {

  

  return (
    <div className='product-card text-start'>
        <div onClick={productVeiwClick} className='product-image-container'>
<img  src={thumbnail} alt='image'/>
        </div>
<div className='product-desc'>

<h1 className='product-name'>{name}</h1>
<div className='star-rating'>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-regular fa-star"></i>
</div>
<div className='flex justify-between w-full items-center'>
<p className='product-price'>{'$'+price}</p>
<i class="fa-regular fa-heart cursor-pointer"></i>
</div>


</div>


    </div>
  )
}
