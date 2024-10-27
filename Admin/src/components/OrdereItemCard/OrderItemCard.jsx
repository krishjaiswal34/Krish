import React from "react";
import { useContext } from "react";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "../../contexts/adminContext";

const OrderItemCard = ({ orderDetail }) => {
  const { product, status } = orderDetail;
  const [orderStatus, setOrderStatus] = useState(status);
  const { updateOrderStatus } = useContext(AdminContext);

  const thumbnail = product?.thumbnail;
  const price = parseInt(product?.price);
  console.log("priceiie:", price);
  const name = product?.name;
  const buiedQuantity = product?.quantityToBuy;
  const buiedSize = product?.sizeToBuy;
  const orderId = orderDetail?._id;
  const orderedAt = orderDetail?.createdAt;

  const totalPrice = buiedQuantity * price;

  const colorChagneofStatus = () => {
    if (orderStatus == "Delivered") {
      return "bg-[rgba(0,150,0,0.3)]";
    }
    if (orderStatus == "Deliver soon") {
      return "bg-[rgba(0,0,150,0.3)]";
    }
    if (orderStatus == "Not delivered") {
      return "bg-[rgba(150,0,0,0.3)]";
    }
  };
  return (
    <div className="w-full   sm:flex px-4 py-4 gap-6 sm:h-[300px] ">
      <div
        onClick={() =>
          navigate("/product-detail", { state: { product: product } })
        }
        className="sm:w-1/3 w-full bg-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center sm:product-image h-[300px] "
      >
        <img className="h-full" src={thumbnail} />
      </div>
      <div
        className="sm:w-2/3 w-full flex flex-col gap-1 text-start
"
      >
        <div className="flex justify-between items-center text-xl w-full ">
          <h1 className=" ">{name}</h1>
          <h1>${price}</h1>
        </div>
        <div className="flex justify-between items-center text-[rgba(0,0,0,0.6)] text-lg w-full ">
          <h1 className=" ">Size</h1>
          <h1>{buiedSize}</h1>
        </div>
        <div className="flex justify-between items-center w-full text-lg text-[rgba(0,0,0,0.6)]   ">
          <h1 className=" ">Quantity</h1>
          <h1>{buiedQuantity}</h1>
        </div>
        {/*total price */}
        <div className="flex justify-between items-center text-lg w-full ">
          <h1 className=" ">Total price</h1>
          <h1>${totalPrice}</h1>
        </div>
        {/*order staus */}

        {/*order id */}
        <div className="flex justify-between items-center text-lg w-full text-[rgba(0,0,0,0.6)] flex-wrap">
          <h1 className="">Order id</h1>
          <h1 className="break-all max-w-full">{orderId}</h1>
        </div>
        <hr />
        <div className="flex justify-between items-center text-lg w-full text-[rgba(0,0,0,0.6)]  ">
          <h1 className=" ">Ordered By</h1>
          <h1>{orderDetail?.shipingInfo?.name}</h1>
        </div>

        {/*Action buttons */}
        <div className="flex gap-4 mt-5 flex-wrap">
          <select
            onChange={(e) => setOrderStatus(e.target.value)}
            value={orderStatus}
            className={`relative flex items-center justify-center  ${colorChagneofStatus()} px-4 py-2  `}
          >
            <option>Delivered</option>
            <option>Deliver soon</option>
            <option>Not delivered</option>
          </select>
          <button
            onClick={() => updateOrderStatus(orderDetail?._id, orderStatus)}
            className="py-2 px-6 outline-none bg-black text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
