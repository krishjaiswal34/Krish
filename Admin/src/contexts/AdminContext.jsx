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
          console.log("resoponeData:", responeData);
          setOrders(responeData.orders);
        } else {
          toast.error("Error fetching products");
        }
      });
    } catch (error) {
      toast.error("Unexpected error");
    }
  };

  const fetchListeProducts = () => {
    try {
      fetch(`${SERVER_URL}/products`).then(async (response) => {
        if (response.ok) {
          const responeData = await response.json();
          console.log("resoponeData:", responeData);
          setListedProducts(responeData.products);
        } else {
          toast.error("Error fetching products");
        }
      });
    } catch (error) {
      toast.error("Unexpected error");
    }
  };
  const updateOrderStatus=(_id,newStatus)=>{

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
          console.log("response data fter product update:",responeData)
          toast.success('Order status updated')
          if(responeData){
            fetchOrders();
          }
        }
      })
    }catch(erroor){

  alert("erroor updateing status")
    }

  }
const deleteAProduct=(_id)=>{
  try{

    fetch(`${SERVER_URL}/deleteAProduct/?product_id=${_id}`,{
      method:'DELETE',
      headers:{
        'content-type':'application/json'
      },
     
    }).then(async(response)=>{
      if(response.ok){
        const responeData=await response.json();
        console.log("response data product delete",responeData)
       
        if(responeData){
          fetchListeProducts();
          toast.success("Product deleted !")
        }
      }
    })
  }catch(erroor){

alert("erroor Deleting prdduct")
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
