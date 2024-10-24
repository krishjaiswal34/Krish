import React, { useContext, useEffect, useState } from "react";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import { toast } from "react-toastify";
import { OrderedProductCard } from "../../components/OrderedProductCard";
import MainHeading from "../../components/MainHeading";

const UserOrdersPage = () => {
  const { logedInUser } = useContext(FirebaseAuthContext);
  const [loading, setLoading] = useState(false);
  const [orders,setOrders]=useState([]);

  const fethcUserOrders = () => {
    setLoading(true);

    try {
      fetch(`http://localhost:8000/userOrders?userAuthId=${logedInUser.uid}`).then(async (response)=>{
        if(response.ok){
            const responseData=await response.json();
            console.log("orders responseData:",responseData)
            setOrders(responseData.orders)
            
        }
        else{
            toast.error("Error fetching orders")
        }
        setLoading(false)
      })
    } catch (err) {
      toast.error("Error fetching orders !");
    }
  };

  useEffect(()=>{
    if(logedInUser){
        fethcUserOrders();
    }
  },[logedInUser])
  
  return  <>
  
  {
  !loading?  orders.length>0?<div className="w-full min-h-[100vh] ">

    <MainHeading text={"YOUR ORDERS"} />
  
    <div className="w-full min-h-[100vh] flex  gap-8 mt-10">
      {/*all cart items list */}
      <div className="flex flex-col gap-4  w-full font-semibold">
        <div className="w-full px-2 py-4 flex justify-between items-center ">
          <p className="w-2/6 flex items-center justify-center ">PRODUCT DETAIL</p>
          <p className="w-1/6 flex items-center justify-center ">ORDERED DATE</p>
          <p className="w-1/6 flex items-center justify-center ">ORDER STATUS</p>
          
        </div>
        <div className="flex-1 flex flex-col gap-8 items-start">
          {orders?.map((order, index) => {
           
            return (
             <OrderedProductCard orderDetail={order}/>
            );
          })}
        </div>
      </div>

    </div>
  </div>:<div>No orders yet</div>:<div>fetching orders</div>
  }
  </>;
};

export default UserOrdersPage;
