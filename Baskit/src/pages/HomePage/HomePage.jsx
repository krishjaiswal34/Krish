import React, { useContext } from 'react'
import { HeroSection } from '../../components/HeroSection/HeroSection'
import MainHeading from '../../components/MainHeading'
import { Subheading } from '../../components/Subheading'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductList } from '../../components/ProductList/ProductList'
import { ProductContext } from '../../contexts/ProductContext'

export const HomePage = () => {

  const {products} =useContext(ProductContext)
  return (
   <div className='w-full '>
<HeroSection/> 


{/*Latest collections */}

<MainHeading text={"LATEST COLLECTIONS"}/>
<Subheading text={"Explore our leates collections that can be favourite of yours"}/>


<ProductList products={products}/>
{/*Best sellers*/}

<MainHeading text={"BEST SELLERS"}/>
<Subheading text={"Our best seller products ,look at it "}/>


<ProductList products={products}/>

   </div>
  )
}
