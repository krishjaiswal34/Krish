import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'
import SideBar from './views/SideBar'
import {Outlet,useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useContext } from 'react'
import { FirebaseAuthContext } from './contexts/FirebaseAuthContext'

function App() {
  const {logedInUser}=useContext(FirebaseAuthContext)
  const navigate=useNavigate()
  const [count, setCount] = useState(0)
  useEffect(()=>{
    if(!logedInUser){
navigate('/login')
    }
  },[logedInUser])

  return (
   <>
    <div className='min-h-[100vh] h-full'>
     
     <NavBar/>
     
    
     <div className='border-t-2 sm:flex '>
      <SideBar/>


      <Outlet/>


     </div>
    

    </div>
    <ToastContainer/>
   
   </>
  )
}

export default App
