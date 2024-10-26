import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
const MenuSideBar = ({isMenu,handleMenuBarToggle}) => {
  return (
    <div className={`fixed right-0 top-0 flex  w-full  h-full z-50 ${isMenu?'visible':'hidden'}`}>
        <div className='w-1/2 h-full'>

        </div>
<div className='w-1/2  h-full bg-[rgba(0,0,0,1)] flex flex-col  gap-4 text-lg  py-10 items-start px-5 text-white'>

<div onClick={handleMenuBarToggle} className='flex justify-center items-center h-[40px] w-[40px] rounded-full cursor-pointer mb-10 bg-white text-black'>
<FontAwesomeIcon  icon={faX} />
</div>
       <NavLink to={'/'} className="font-semibold nav-options-hover-animation ">Home</NavLink>
        <NavLink to={'shop'} className="font-semibold nav-options-hover-animation ">Shop</NavLink>
        <NavLink to={'user-orders'} className="font-semibold nav-options-hover-animation ">Orders</NavLink>
        {/* <p className="font-semibold nav-options-hover-animation ">About</p> */}
        <NavLink className="font-semibold nav-options-hover-animation " to={'contact-us'}>Contact us</NavLink>
 

</div>


    </div>
  )
}

export default MenuSideBar