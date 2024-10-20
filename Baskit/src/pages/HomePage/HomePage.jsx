import React, { useContext } from 'react'
import { HeroSection } from '../../components/HeroSection/HeroSection'
import MainHeading from '../../components/MainHeading'
import { Subheading } from '../../components/Subheading'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductList } from '../../components/ProductList/ProductList'
import { ProductContext } from '../../contexts/ProductContext'
import Offerings from '../../components/Offerings/Offerings'
import { ToastContainer } from 'react-toastify'


export const HomePage = () => {

  const {products,latesCollectionRef} =useContext(ProductContext)
  return (
   <div className='w-full '>

<HeroSection/> 
{/* 
offerings */}
    <Offerings/>
{/*Latest collections */}

<div ref={latesCollectionRef}><MainHeading  text={"LATEST COLLECTIONS"}/></div>
<Subheading  text={"Explore our leates collections that can be favourite of yours"}/>


<ProductList products={products}/>
{/*Best sellers*/}

<MainHeading text={"FEATURD PRODUCTS"}/>
<Subheading text={"Our best seller products ,look at it "}/>


<ProductList products={products} featured={true}/>


   </div>
  )
}
