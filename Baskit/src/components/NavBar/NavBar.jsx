import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='flex justify-between items-center py-4 w-full'>

<NavLink to={'/'} className='logo font-semibold text-3xl cursor-pointer'>BASKIT</NavLink>



<div className='flex  gap-4 text-lg items-center justify-center '>
  <p>Home</p>
  <p>Shop</p>
  <p>About</p>
  <p>Contact us</p>
  <p>|</p>
<i class="fa-solid fa-magnifying-glass"></i>
<i class="fa-solid fa-cart-shopping"></i>
<i class="fa-solid fa-user"></i>

</div>

    </div>
  )
}
