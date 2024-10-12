import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from '../pages/HomePage/HomePage'
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage'
import CartPage from '../pages/Cartpage/CartPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { SignupPage } from '../pages/SignupPage/SignupPage'


export const routes=createBrowserRouter([
    {
path:'/',
element:<App/>,
children:[
    {
        path:'/',
        element:<HomePage/>
    },{
        path:'product-detail',
        element:<ProductDetailPage/>
    },{
        path:'cart',
        element:<CartPage/>
    }
]
    },
    {
        path:'/signup',
        element:<SignupPage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
  
    
])