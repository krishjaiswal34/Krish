import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import { routes } from './routes/routes.jsx'
import { AdminContextProvider } from './contexts/adminContext.jsx'
createRoot(document.getElementById('root')).render(

<AdminContextProvider>
    
<RouterProvider router={routes}/>
</AdminContextProvider>


)
