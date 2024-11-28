import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { AddItemsView } from '../views/AddItemsView'
import { OrdersView } from '../views/OrdersView'
import { ListedProductsView } from '../views/ListedProductsView'

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
    }
])