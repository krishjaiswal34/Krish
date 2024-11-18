import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from '../pages/HomePage/HomePage'
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage'
import CartPage from '../pages/Cartpage/CartPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { SignupPage } from '../pages/SignupPage/SignupPage'
import Contact from '../pages/Contact/Contact'
import { ShopPage } from '../pages/ShopPage/ShopPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import UserOrdersPage from '../pages/UserOrdersPage/UserOrdersPage'
import AboutUs from '../pages/AboutUs'




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
        element:<ProductDetailPage/>,
     
    },{
        path:'cart',
        element:<CartPage/>
    },
    {
        path:'contact-us',
        element:<Contact/>
    },{
        path:'shop',
        element:<ShopPage/>
    },{
        path:'order',
        element:<OrderPage/>
    },{
        path:'user-orders',
        element:<UserOrdersPage/>
    },
    {
        path:'about-us',
        element:<AboutUs/>
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