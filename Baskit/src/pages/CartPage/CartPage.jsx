import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../../components/MainHeading";
import CartItemCard from "../../components/CartItemCard";
import { Button } from "../../components/Button";
import { useColorScheme } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";

const CartPage = () => {
  const { products, cartProducts } = useContext(ProductContext);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const shippingFees = 15;

  useEffect(() => {
    var updatedPrice = subtotalPrice;
    cartProducts.forEach((product) => {
      const price = parseInt(product.price);
      console.log("price::", price);
      updatedPrice = updatedPrice + price;
    });
    setSubtotalPrice(updatedPrice);
  }, [cartProducts]);
  return (
    <div className="w-full min-h-[100vh] ">
      <MainHeading text={"YOUR CART"} />

      <div className="w-full min-h-[100vh] flex gap-8 mt-5">
        {/*all cart items list */}
        <div className="flex-1 flex flex-col gap-8 items-start">
          {cartProducts.map((product, index) => {
            return <CartItemCard key={index} product={product} />;
          })}
        </div>

        {/*checkout container */}

        <div className="w-1/3 py-5 px-5 flex flex-col border-2 rounded-s max-h-[400px] gap-6">
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
