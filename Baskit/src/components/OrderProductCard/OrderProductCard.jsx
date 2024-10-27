import React, { useContext, useEffect, useState } from "react";
import { SmallImage } from "../SmallImage/SmallImage";
import { ProductContext } from "../../contexts/ProductContext";
import Delete from "@mui/icons-material/Delete";
import { DeleteBtn } from "../DeleteBtn/DeleteBtn";
import { faSave } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../SmallImage/SmallImage";
import './OrderProductCard.css'
import {formatDate} from '../../utils/formatDate'
import { useNavigate } from "react-router-dom";
const OrderProductCard = ({ orderDetail }) => {
  const {
    product,
    product_id,

    status,
  } = orderDetail;

  const navigate = useNavigate();
  console.log("product", product, "product_id:", product_id);

  const thumbnail = product?.thumbnail;
  const price = parseInt(product?.price);
  console.log("priceiie:", price);
  const name = product?.name;
  const buiedQuantity = product?.quantityToBuy;
  const buiedSize = product?.sizeToBuy;
  const orderId = orderDetail?._id;
  const orderedAt = orderDetail?.createdAt;

  const totalPrice = buiedQuantity * price;

  const handleBuyBtnClick = () => {
    navigate("/order", {
      state: {
        product: product,
        quantityToBuy: buiedQuantity,
        sizeToBuy: buiedSize,
      },
    });
  };

  const colorChagneofStatus = () => {
    if (status == "Delivered") {
      return "bg-[rgba(0,150,0,0.3)]";
    }
    if (status == "Deliver soon") {
      return "bg-[rgba(0,0,150,0.3)]";
    }
    if (status == "Not delivered") {
      return "bg-[rgba(150,0,0,0.3)]";
    }
  };
  return (
    <div className="w-full sm:flex px-4 py-4 gap-6 sm:h-[350px] ">
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
        <div className="flex justify-between items-center text-lg w-full ">
          <h1 className="text-[rgba(0,0,0,0.6)]  ">Order status</h1>
          <div className="relative">
            <h1 className="order-status">{status}</h1>
            <div
              className={` flex items-center justify-center ${colorChagneofStatus()} h-1 rounded-full w-full absolute`}
            ></div>
          </div>
        </div>
        {/*order id */}
        <div className="flex justify-between items-center text-lg w-full text-[rgba(0,0,0,0.6)] ">
          <h1 className=" ">Order id</h1>
          <h1>{orderId}</h1>
        </div>
        {/**ordered at */}
        <div className="flex justify-between items-center text-lg w-full text-[rgba(0,0,0,0.6)] ">
          <h1 className=" ">Ordered at</h1>
          <h1>{formatDate(orderedAt)}</h1>
        </div>

        {/*Action buttons */}
        <div className="flex gap-4 mt-5 flex-wrap">
          <button
            onClick={() => handleBuyBtnClick()}
            className="py-2 px-4 outline-none bg-black text-white"
          >
            Buy again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
