import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../../components/MainHeading";

import { ProductContext } from "../../contexts/ProductContext";

import "react-toastify/dist/ReactToastify.css";

import CartProduct from "../../components/CartProduct/CartProduct";

const CartPage = () => {
  const { products, cartProducts } = useContext(ProductContext);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [eachProductTotalPrice, setEachProductTotalPrice] = useState({});

  const shippingFees = 15;
  console.log("cart product cart page:", cartProducts);
  console.log("product from cart page;", products);

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

        <div className="lg:w-1/3 w-full py-5 px-5 flex flex-col border-2 rounded-s max-h-[300px] gap-6">
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
              <p>${parseFloat((shippingFees + subtotalPrice).toFixed(2))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
