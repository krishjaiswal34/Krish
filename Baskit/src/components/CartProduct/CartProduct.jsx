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
import { useNavigate } from "react-router-dom";
const CartProduct = ({
  product,
  product_id,
  sizeToBuy,
  quantityToBuy,
  setEachProductTotalPrice,
}) => {
  const navigate = useNavigate();
  console.log("product", product, "product_id:", product_id);

  const thumbnail = product?.thumbnail;
  const price = parseInt(product?.price);
  console.log("priceiie:", price);
  const name = product?.name;
  const [productQuantity, setProductQuantity] = useState(quantityToBuy);
  const { removeProductFromUserCart, updateCartProduct } =
    useContext(ProductContext);
  const totalPrice = productQuantity * price;

  const handleBuyBtnClick = () => {
    navigate("/order", {
      state: {
        product: product,
        quantityToBuy: quantityToBuy,
        sizeToBuy: sizeToBuy,
      },
    });
  };

  useEffect(() => {
    setEachProductTotalPrice((preve) => ({
      ...preve,
      [product_id]: { price, productQuantity },
    }));
  }, [productQuantity, product]);
  return (
    <div className="w-full flex px-4 py-4 h-[250px] gap-6">
      <div
        onClick={() =>
          navigate("/product-detail", { state: { product: product } })
        }
        className="w-1/3 bg-[rgba(0,0,0,0.1)] h-full rounded-lg flex items-center justify-center "
      >
        <img className="h-full" src={thumbnail} />
      </div>
      <div
        className="w-2/3 flex flex-col gap-1 text-start
"
      >
        <div className="flex justify-between items-center text-xl w-full ">
          <h1 className=" ">{name}</h1>
          <h1>${price}</h1>
        </div>
        <div className="flex justify-between items-center text-[rgba(0,0,0,0.6)] text-lg w-full ">
          <h1 className=" ">Size</h1>
          <h1>{sizeToBuy}</h1>
        </div>
        <div className="flex justify-between items-center w-full text-lg text-[rgba(0,0,0,0.6)]   ">
          <h1 className=" ">Quantity</h1>
          <div className="w-1/6 flex gap-4 items-center justify-center ">
            <p
              onClick={() =>
                setProductQuantity(
                  productQuantity > 1 ? productQuantity - 1 : productQuantity
                )
              }
              className="text-[30px] font-semibold cursor-pointer"
            >
              -
            </p>{" "}
            <div className="h-[40px] min-w-[50px] border-2 border-[rgba(0,0,0,0.5)] rounded-s flex justify-center items-center">
              {productQuantity}
            </div>{" "}
            <p
              onClick={() => setProductQuantity(productQuantity + 1)}
              className="text-[30px] font-semibold cursor-pointer"
            >
              +
            </p>
          </div>
        </div>
        {/*total price */}
        <div className="flex justify-between items-center text-lg w-full ">
          <h1 className=" ">Total price</h1>
          <h1>${totalPrice}</h1>
        </div>
        {/*Action buttons */}
        <div className="flex gap-4 mt-5 flex-wrap">
          
          <button
            onClick={() => updateCartProduct(product_id, productQuantity)}
            className="py-2 px-4 outline-none border border-black text-black hover:bg-[rgba(0,0,0,0.1)]"
          >
            Save
          </button>
          <button
            onClick={() => removeProductFromUserCart(product_id)}
            className="py-2 px-4 outline-none border border-black text-black hover:bg-[rgba(0,0,0,0.1)]"
          >
            Delete
          </button>
          <button
            onClick={() => handleBuyBtnClick()}
            className="py-2 px-4 outline-none bg-black  hover:bg-[rgba(0,0,0,0.8)] text-white"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
