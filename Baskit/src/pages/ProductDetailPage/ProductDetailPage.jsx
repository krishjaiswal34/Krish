import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import SizeSelectOption from "../../components/SizeSelectOption";
import { Button } from "../../components/Button";
import { SmallImage } from "../../components/SmallImage/SmallImage";
import { ProductContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";
import "./ProductDetailPage.css";
export const ProductDetailPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [previwImage, setPreviewImage] = useState(product && product.thumbnail);
  const { addProductToUserCart, logedInUser } = useContext(ProductContext);
  const [descTab, setDescTab] = useState("description");
  const [sizeToBuy, setSizeToBuy] = useState("M");
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const navigate = useNavigate();

  console.log("product from product detail::", product);

  const handleAddToCartBtnClick = () => {
    if (logedInUser) {
      addProductToUserCart(product, sizeToBuy, quantityToBuy);
    } else {
      toast.error("User not logined !");
    }
  };
  const handleBuyNowBtnClick = () => {
    if (logedInUser) {
      navigate("/order", {
        state: {
          product: product,
          quantityToBuy: quantityToBuy,
          sizeToBuy: sizeToBuy,
        },
      });
    } else {
      toast.error("User not logined !");
    }
  };
  // const handleTabToggle = (selectedTab) => {
  //   setDescTab(selectedTab);
  // };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-full">
      <hr />
      <div className="product-display-container ">
        <div className="product-images-container ">
          <div className="product-small-images  ">
            {product &&
              product.extraImages.map((image, index) => {
                return (
                  <SmallImage image={image} setPreviewImage={setPreviewImage} />
                );
              })}
          </div>

          <div className="product-main-image ">
            <img className="h-full " src={previwImage} alt="image" />
          </div>
        </div>

        {/* procuct description */}

        <div className="product-desc-container ">
          <h1 className="text-2xl font-semibold">{product && product.name}</h1>
          <div className="flex gap-1 text-orange-500 text-base mt-4">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p className="text-2xl font-semibold my-6">{"$" + product.price}</p>

          <p className="mb-6">{product && product.smallDescription}</p>
          <p className="text-[17px]">Select size</p>
          <div className="flex gap-2 mt-4 mb-8">
            {product &&
              product.sizes.map((size, index) => {
                return (
                  <SizeSelectOption
                    text={size}
                    setSizeToBuy={setSizeToBuy}
                    sizeToBuy={sizeToBuy}
                  />
                );
              })}
          </div>

          <div className="flex gap-5">
            <button
              onClick={handleAddToCartBtnClick}
              className="py-2 px-4 bg-black text-white hover:bg-[rgba(0,0,0,0.8)]"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNowBtnClick}
              className="py-2 px-4 border-2 border-black text-black "
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      {/* 
      <div className="my-10">
        <div className="flex">
          <div
            onClick={() => setDescTab("description")}
            className={`border-2 py-2 px-4  cursor-pointer ${
              descTab === "description" ? "bg-[rgba(0,0,0,0.2)]" : ""
            }`}
          >
            Description
          </div>
          <div
            onClick={() => setDescTab("reviews")}
            className={`border-2 py-2 px-4  cursor-pointer ${
              descTab === "reviews" ? "bg-[rgba(0,0,0,0.2)]" : ""
            }`}
          >
            Reviews
          </div>
        </div>
        <div className="border-2 py-6 px-4">
          {descTab === "description"
            ? product.fullDescription
            : "reviews are shown here"}
        </div>
      </div> */}
    </div>
  );
};
