import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const [listedProducts, setListedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    try {
      fetch("http://localhost:8000/orders").then(async (response) => {
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
      fetch("http://localhost:8000/products").then(async (response) => {
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

      fetch('http://localhost:8000/updateOrderStatus',{
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
          if(responeData){
            fetchOrders();
          }
        }
      })
    }catch(erroor){

  alert("erroor updateing status")
    }

  }

  useEffect(() => {
    fetchListeProducts();
    fetchOrders();
  }, []);

  return (
    <AdminContext.Provider value={{ orders,listedProducts,updateOrderStatus }}>{children}</AdminContext.Provider>
  );
};
export { AdminContext, AdminContextProvider };
