import React from 'react'
import './ProductList.css'
import { ProductCard } from '../ProductCard/ProductCard'
import { ProductCardContainer } from '../../container/ProductCardContainer'

export const ProductList = ({products}) => {
  return (

    
    <div className='proudct-list-container'>

{
  products&& products.map((product,index)=><ProductCardContainer product={product}/>)
}

    </div>
  )
}
