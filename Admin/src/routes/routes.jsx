import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { AddItemsView } from '../views/AddItemsView'
import { OrdersView } from '../views/OrdersView'
import { ListedProductsView } from '../views/ListedProductsView'
import {SignupPage} from '../pages/SignupPage/SignupPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'

export const routes=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<AddItemsView/>
            },
            {
                path:'listedProducts',
                element:<ListedProductsView/>
            },{
                path:'orders',
                element:<OrdersView/>
            }

        ]
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/signup',
        element:<SignupPage/>
    }
])