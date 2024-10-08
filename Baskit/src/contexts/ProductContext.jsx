import  { createContext, useEffect, useState } from 'react'

import { products as productsList } from '../assets/MockData';

const ProductContext=createContext();
const ProductContextProvider=({children})=>{

const [products,setProducts]=useState([]);

   useEffect(()=>{
    setProducts(productsList);
   },[])

    // useEffect(()=>{
    //     const fetchingProducts=()=>{
    //         try{
    //             fetch('https://dummyjson.com/products/category/mens-shoes').then(async (response)=>{
        
    //             if(response.ok){
    //                 const responseData=await response.json();
    //                 console.log("response data:",responseData)
    //                 setProducts(responseData.products)
    //             }
    //             })
    //         }
    //         catch(error){
    //             console.log("Error during data fetch::",error)
    //         }
        
        
    //         }
    //         fetchingProducts();

    // },[])
    return <ProductContext.Provider value={{

        products

    }}>

        {children}
    </ProductContext.Provider>

}

export {ProductContext,ProductContextProvider}