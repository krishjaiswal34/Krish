import  { createContext, useEffect, useState } from 'react'

import { products as productsList } from '../assets/MockData';

const ProductContext=createContext();
const ProductContextProvider=({children})=>{

const [products,setProducts]=useState([]);

   useEffect(()=>{
    setProducts(productsList);
   },[])

useEffect(()=>{

const fetchProducts=async()=>{

    try{
        http://localhost:5174/

        fetch('http://localhost:8000/products').then(async(response)=>{
const responseData=await response.json();
console.log("fetched products:",responseData)
setProducts(responseData.products)
        })
    }catch(error){
        console.log("Error fetching products:",error)
    }
}
    fetchProducts();


},[])

    return <ProductContext.Provider value={{

        products

    }}>

        {children}
    </ProductContext.Provider>

}

export {ProductContext,ProductContextProvider}