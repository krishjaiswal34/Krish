import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { AddItemsView } from '../views/AddItemsView'
import { OrdersView } from '../views/OrdersView'
import { ListedProductsView } from '../views/ListedProductsView'

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
    }
])