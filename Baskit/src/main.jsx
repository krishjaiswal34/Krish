import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes/Routes.jsx'
import { ProductContextProvider } from './contexts/ProductContext.jsx'

createRoot(document.getElementById('root')).render(

  <ProductContextProvider>
 <RouterProvider router={routes}/>
  </ProductContextProvider>
   

)
