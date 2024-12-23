import React, { useContext } from 'react'
import './HeroSection.css'
import men from '../../assets/Images/model4.png'
import { ProductContext } from '../../contexts/ProductContext'
export const HeroSection = () => {

  const {scrollToView}=useContext(ProductContext)
  return (

    <div className='hero-section'>
<div className='hero-desc  px-5 text-start  '>

<h1 className='hero-section-heading font-bold mb-5 '>Elevate Your Everyday Look</h1>
<p className='hero-section-subheading'>Discover the latest trends in  fashion. Find your perfect look, whether casual, business, or street style ,Discover the latest trends in men's fashion. Find your perfect look, whether casual, business, or street style.</p>
{/* <button className='bg-[black] text-white text-lg px-4 py-2 rounded-full mt-7 '>Shop Now</button> */}

<button
onClick={()=>scrollToView('latestcollections')}

  class="flex justify-center gap-2 items-center shadow-md  sm:mt-10 mt-4 text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  Shop Now
  <svg
    class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      class="fill-gray-800 group-hover:fill-gray-800"
    ></path>
  </svg>
</button>

</div>
<div className='hero-visual overflow-hidden flex items-center justify-center'>

<img className='h-full' src={men}/>
</div>
    </div>

  )
}
