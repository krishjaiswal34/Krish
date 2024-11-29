import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {toast} from 'react-toastify'

const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  const [listedProducts, setListedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    try {
      fetch(`${SERVER_URL}/orders`).then(async (response) => {
        if (response.ok) {
          const responeData = await response.json();
        
          setOrders(responeData.orders);
        } else {
          console.log("Error fetching products");
        }
      });
    } catch (error) {
      console.log("Unexpected error",error);
    }
  };

  const fetchListeProducts = () => {
    try {
      fetch(`${SERVER_URL}/products`).then(async (response) => {
        if (response.ok) {
          const responeData = await response.json();
         
          setListedProducts(responeData.products);
        } else {
          console.log("Error fetching products");
        }
      });
    } catch (error) {
      console.log("Unexpected error")
    }
  };
  const updateOrderStatus=(_id,newStatus)=>{
const id=toast.loading("Updating order status...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    try{

      fetch(`${SERVER_URL}/updateOrderStatus`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          _id,
          newStatus

        })
      }).then(async(response)=>{
        if(response.ok){
          const responeData=await response.json();
         
          toast.update(id,{ render: "Order status updated ",
          type: "success", 
          isLoading: false, 
          autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          if(responeData){
            fetchOrders();
          }
        }
      })
    }catch(erroor){

  
      toast.update(id,{ render: "Error updating order",
      type: "error", 
      isLoading: false, 
      autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    }

  }
const deleteAProduct=(_id)=>{
  const id=toast.loading("Deleting product...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
  try{

    fetch(`${SERVER_URL}/deleteAProduct/?product_id=${_id}`,{
      method:'DELETE',
      headers:{
        'content-type':'application/json'
      },
     
    }).then(async(response)=>{
      if(response.ok){
        const responeData=await response.json();
     
       
        if(responeData){
          fetchListeProducts();
          toast.update(id,{ render: "Product delted",
          type: "success", 
          isLoading: false, 
          autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
        }
      }
    })
  }catch(erroor){

    toast.update(id,{ render: "Error deleting product",
    type: "error", 
    isLoading: false, 
    autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
  }
}
  useEffect(() => {
    fetchListeProducts();
    fetchOrders();
  }, []);

  return (
    <AdminContext.Provider value={{ orders,listedProducts,updateOrderStatus,deleteAProduct }}>{children}</AdminContext.Provider>
  );
};
export { AdminContext, AdminContextProvider };
