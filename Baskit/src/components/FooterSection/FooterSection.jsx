import React from 'react'

export const FooterSection = () => {
  return (
 <div className='mt-52  '>
     <div className='footer-section flex w-full justify-between mb-5  text-start'>

<div className='flex flex-col gap-4 w-[40%]' >
  <h1 className='font-semibold text-2xl'>BASKIT</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
</div>
<div className='flex flex-col gap-4'>
  <h1 className='font-semibold text-xl'>COMPANY</h1>
  <ul className='gap-2'>
    <li>Home</li>
    <li>About us </li>
    <li>Delivery</li>
    <li>Privacy policy</li>
  </ul>
</div>
<div className='flex flex-col gap-4'>
  <h1 className='font-semibold text-xl'>GET IN TOUCH</h1>
 <ul>
 <li>+1-000-000-0000</li>
    <li>prajapatianurag7320@gmail.com</li>
    <li>Instagram</li>
 </ul>

</div>

    </div>
    <hr/>
    <h1 className='py-5'>Copyright 2024@ Baskit - All Right Reserved.</h1>
 </div>
  )
}
