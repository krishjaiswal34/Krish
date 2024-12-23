import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { NavBar } from './components/NavBar/NavBar'
import { FooterSection } from './components/FooterSection/FooterSection'
import { Outlet, useNavigate } from 'react-router-dom'
import { FirebaseAuthContext } from './contexts/FirebaseAuthContext'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);
  const navigate=useNavigate();
  const {logedInUser}=useContext(FirebaseAuthContext);



  return (
   <>
 
  
   <NavBar/>
<Outlet/>
<FooterSection/>
<ToastContainer/>
   </>
  )
}

export default App
