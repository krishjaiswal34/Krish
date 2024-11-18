import React from 'react'
import { useContext } from 'react'
import {FirebaseAuthContext} from '../contexts/FirebaseAuthContext'
const NavBar = () => {
  const {logedInUser,logOut}=useContext(FirebaseAuthContext)
  return (
    <div className='w-full flex justify-between py-4 text-start'>
        <div>
            <h1 className='font-semibold text-4xl  company-logo'>Style Haven</h1>
            <p>Admin pannel</p>
        </div>
       <div className='text-end'>
        <p className='break-all'>{logedInUser?.email}</p>

       <button onClick={logOut} className=' rounded-full px-4 py-2  bg-[rgba(0,0,0,0.6)] text-white hover:bg-red-700 transition duration-200 ease-in-out'>Logout</button>
       </div>


    </div>
  )
}

export default NavBar