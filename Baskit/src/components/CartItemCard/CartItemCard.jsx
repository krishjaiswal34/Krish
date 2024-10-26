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

const CartItemCard = ({
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
    navigate("/order", { state: { "product": product ,"quantityToBuy":quantityToBuy,'sizeToBuy':sizeToBuy} });
  };

  useEffect(() => {
    setEachProductTotalPrice((preve) => ({
      ...preve,
      [product_id]: { price, productQuantity },
    }));
  }, [productQuantity, product]);

  return (
    <div className=" w-full text-start px-2 py-4 flex justify-between items-center gap-2 ">
      <div className="gap-6 w-2/6 flex items-center justify-center ">
        <div
          onClick={() =>
            navigate("/product-detail", { state: { product: product } })
          }
          className="small-image"
        >
          <img src={product.thumbnail} alt="image" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-lg">${price}</p>
          <p>Size:{sizeToBuy}</p>
        </div>
      </div>

      <p className="w-1/6 flex items-center justify-center">${totalPrice}</p>
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
        <div className="h-[40px] w-[50px] border-2 border-[rgba(0,0,0,0.5)] rounded-s flex justify-center items-center">
          {productQuantity}
        </div>{" "}
        <p
          onClick={() => setProductQuantity(productQuantity + 1)}
          className="text-[30px] font-semibold cursor-pointer"
        >
          +
        </p>
      </div>

      <div
        onClick={() => updateCartProduct(product_id, productQuantity)}
        className="w-1/6 flex items-center justify-center text-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faSave} />
      </div>

      <div
        className=" w-1/6 flex items-center justify-center"
        onClick={() => removeProductFromUserCart(product_id)}
      >
        <Delete className="text-xl cursor-pointer" />
      </div>

      <div
        onClick={() => handleBuyBtnClick()}
        className="w-1/6 flex items-center justify-center text-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faShoppingBag} />
      </div>
     
    </div>
  );
};

export default CartItemCard;
