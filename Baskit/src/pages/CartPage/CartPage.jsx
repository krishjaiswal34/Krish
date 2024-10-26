import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../../components/MainHeading";

import { Button } from "../../components/Button";
import { useColorScheme } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import CartProduct from "../../components/CartProduct/CartProduct";

const CartPage = () => {
  const { products, cartProducts } = useContext(ProductContext);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [eachProductTotalPrice, setEachProductTotalPrice] = useState({});

  const shippingFees = 15;
  console.log("cart product cart page:", cartProducts);

  useEffect(() => {
    var totalPrice = 0;
    if (eachProductTotalPrice) {
      Object.keys(eachProductTotalPrice).map((product) => {
        console.log("Each product totalPrice:", eachProductTotalPrice[product]);
        const { price, productQuantity } = eachProductTotalPrice[product];
        console.log("p:", price, "tq:", productQuantity);
        const totalPriceForAproduct = price * productQuantity;
        console.log("toatalpricefor aproduct:", totalPriceForAproduct);
        totalPrice += totalPriceForAproduct;
      });
      setSubtotalPrice(totalPrice);
    }
  }, [eachProductTotalPrice, cartProducts]);
  return (
    <div className="w-full min-h-[100vh] ">
      <MainHeading text={"YOUR CART"} />

      <div className="w-full min-h-[100vh] lg:flex  gap-8 mt-10">
        {/*all cart items list */}
        <div className="flex flex-col gap-4  w-full font-semibold">
          {/* <div className="w-full px-2 py-4 flex justify-between items-center ">
            <p className="w-2/6 flex items-center justify-center ">PRODUCT DETAIL</p>
            <p className="w-1/6 flex items-center justify-center ">TOTAL PRICE</p>
            <p className="w-1/6 flex items-center justify-center ">QUANTITY</p>
            <p className="w-1/6 flex items-center justify-center ">Save</p>
   
            
          
            
            <p className="w-1/6 flex items-center justify-center ">REMOVE</p>
            <p className="w-1/6 flex items-center justify-center ">BUY NOW</p>
          </div> */}
          <div className="flex-1 flex flex-col gap-8 items-start">
            {cartProducts?.map((pr, index) => {
              const { product, product_id, sizeToBuy, quantityToBuy } = pr;
              return (
                <CartProduct
                  key={index}
                  product={product}
                  product_id={product_id}
                  sizeToBuy={sizeToBuy}
                  quantityToBuy={quantityToBuy}
                  setEachProductTotalPrice={setEachProductTotalPrice}
                />
              );
            })}
         
          </div>
        </div>
        {/*checkout container */}

        <div className="lg:w-1/3 w-full py-5 px-5 flex flex-col border-2 rounded-s max-h-[400px] gap-6">
          <MainHeading text={"CART TOTALS"} />

          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Sub total</p>
              <p>${subtotalPrice}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Shipping fees</p>
              <p>${shippingFees}</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>${shippingFees + subtotalPrice}</p>
            </div>
          </div>

          <Button text={"PROCEED TO CHECKOUT"} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
