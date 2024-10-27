import React, { useContext, useEffect, useState } from "react";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import { toast } from "react-toastify";

import MainHeading from "../../components/MainHeading";
import OrderProductCard from "../../components/OrderProductCard/OrderProductCard";

const UserOrdersPage = () => {
  const { logedInUser } = useContext(FirebaseAuthContext);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fethcUserOrders = () => {
    setLoading(true);

    try {
      fetch(
        `http://localhost:8000/userOrders?userAuthId=${logedInUser.uid}`
      ).then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          console.log("orders responseData:", responseData);
          setOrders(responseData.orders);
        } else {
          toast.error("Error fetching orders");
        }
        setLoading(false);
      });
    } catch (err) {
      toast.error("Error fetching orders !");
    }
  };

  useEffect(() => {
    if (logedInUser) {
      fethcUserOrders();
    }
  }, [logedInUser]);

  return (
    <>
      {!loading ? (
        orders.length > 0 ? (
          <div className="w-full min-h-[100vh] ">
            <MainHeading text={"YOUR ORDERS"} />

            <div className="w-full min-h-[100vh] flex  gap-8 mt-10">
              {/*all cart items list */}
              <div className="flex flex-col gap-4  w-full font-semibold">
              
                <div className="flex-1 flex flex-col gap-8 items-start">
                  {orders?.reverse().map((order, index) => {
                    return <OrderProductCard orderDetail={order} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No orders yet</div>
        )
      ) : (
        <div>fetching orders</div>
      )}
    </>
  );
};

export default UserOrdersPage;
