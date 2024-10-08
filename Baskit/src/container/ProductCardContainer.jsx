import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard/ProductCard';

export const ProductCardContainer = ({product}) => {
    const navigate=useNavigate();
    const {name,price,thumbnail}=product;

    const handleProductViewClick=()=>{
        console.log("card clicked..")
        navigate('product-detail',{state:{"product":product}});

    }
  return (
    <>
    <ProductCard name={name} price={price} thumbnail={thumbnail} productVeiwClick={handleProductViewClick} />
    </>
  )
}
