import React from 'react'
import { useContext } from 'react'
import {FirebaseAuthContext} from '../contexts/FirebaseAuthContext'
const NavBar = () => {
  const {logedInUser}=useContext(FirebaseAuthContext)
  return (
    <div className='w-full flex justify-between py-4 text-start'>
        <div>
            <h1 className='text-xl font-semibold'>BASKIT</h1>
            <p>Admin pannel</p>
        </div>
       <div className='text-end'>
        <p>{logedInUser.email}</p>

       <button className=' rounded-full px-4 py-2  bg-[rgba(0,0,0,0.6)] text-white'>Logout</button>
       </div>


    </div>
  )
}

export default NavBar