import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { NavBar } from './components/NavBar/NavBar'
import { FooterSection } from './components/FooterSection/FooterSection'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <NavBar/>
<Outlet/>
<FooterSection/>
   </>
  )
}

export default App
