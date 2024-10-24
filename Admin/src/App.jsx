import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'
import SideBar from './views/SideBar'
import {Outlet} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-[100vh] h-full'>
      <ToastContainer/>
     <NavBar/>
     
    
     <div className='border-t-2 flex'>
      <SideBar/>


      <Outlet/>


     </div>


    </div>
  )
}

export default App
