import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerImage from '../../assets/Images//b10.jpg'
import './ShopPage.css'
import { ProductContext } from '../../contexts/ProductContext'
import MainHeading from '../../components/MainHeading'
import { Subheading } from '../../components/Subheading'
import { ProductList } from '../../components/ProductList/ProductList'
import Banner from '../../components/Banner'
import FilterBar from '../../components/FilterBar/FilterBar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
export const ShopPage = () => {
   
  const {products,shopProducts}=useContext(ProductContext)
const [isFilterBar,setIsFilterBar]=useState(false)

  return (
   <div className='w-full'>

{/*shop banner */}
<Banner bannerImage={bannerImage} heading={'SHOP'}/>
<MainHeading text={"OUR ALL PRODUCTS"}/>
<Subheading text={"Find fashion from our extensive collections ,that fits weell on you from"}/>

<div onClick={()=>setIsFilterBar(true)} className="border border-[var(--primary-color)] px-4 py-2 rounded-xl max-w-[100px] md:hidden cursor-pointer">
      Filter 
     </div>
<div className='flex relative'>

<div>
     <div className="md-hide">
     <FilterBar/>
     </div>

     

     </div>

<div className={`absolute top-0 left-0 sm:px-4 px-2 border-r-2 shadow-lg  flex gap-2 bg-white ${isFilterBar?'visible':'hidden'}`}>
  <FilterBar/>
  <FontAwesomeIcon onClick={()=>setIsFilterBar(false)} icon={faX} className="text-black text-xl cursor-pointer mt-8"/>
</div>



     <ProductList products={shopProducts} all={true} />




</div>


   </div>
  )
}
