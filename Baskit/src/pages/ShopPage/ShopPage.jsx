import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerImage from '../../assets/Images//b10.jpg'
import './ShopPage.css'
import { ProductContext } from '../../contexts/ProductContext'
import MainHeading from '../../components/MainHeading'
import { Subheading } from '../../components/Subheading'
import { ProductList } from '../../components/ProductList/ProductList'
import Banner from '../../components/Banner'
export const ShopPage = () => {
   
  const {products}=useContext(ProductContext)


  return (
   <div className='w-full'>

{/*shop banner */}
<Banner bannerImage={bannerImage} heading={'SHOP'}/>
<MainHeading text={"OUR ALL PRODUCTS"}/>
<Subheading text={"Find fashion from our extensive collections ,that fits weell on you from"}/>


<ProductList products={products} all={true}/>
   </div>
  )
}
