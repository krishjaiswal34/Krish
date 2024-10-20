import React from 'react'
import './ProductList.css'
import { ProductCard } from '../ProductCard/ProductCard'
import { ProductCardContainer } from '../../container/ProductCardContainer'

export const ProductList = ({products,featured=false}) => {
  return (

    
    <div className='proudct-list-container'>

{
  products&& products.map((product,index)=>{
if(product.isFeatured===featured){

  return <ProductCardContainer product={product}/>
}


  }
  
  
  
  
  )
}

    </div>
  )
}
