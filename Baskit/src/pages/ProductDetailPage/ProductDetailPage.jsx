import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import SizeSelectOption from "../../components/SizeSelectOption";

import { SmallImage } from "../../components/SmallImage/SmallImage";
import { ProductContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";
import "./ProductDetailPage.css";
import ReviewCard from "../../components/ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCodePullRequest, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../../components/StarRating";
import {getAverageRating} from '../../utils/getAverageRating'
import { Loader } from "../../components/Loader/Loader";
export const ProductDetailPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [previwImage, setPreviewImage] = useState(product && product.thumbnail);
  const { addProductToUserCart, logedInUser,addProductRating } = useContext(ProductContext);
  const [descTab, setDescTab] = useState("description");
  const [sizeToBuy, setSizeToBuy] = useState(product?.sizes[0]);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [rating,setRating]=useState();
  const [comment,setComment]=useState('');
 

  const navigate = useNavigate();



  const handleAddToCartBtnClick = () => {
    if (logedInUser) {




      
         addProductToUserCart(product, sizeToBuy, quantityToBuy);
     
      




    } else {
      toast.error("User not logined !",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'});
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
      toast.error("User not logined !",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'});
    }
  };

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
          <h1 className="text-2xl font-semibold">{product && product.name} | {product?.subCategory}</h1>
          <StarRating rating={getAverageRating(product?.reviews)} />
          <p className="text-2xl font-semibold my-6">{"₹" + product.price}</p>

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
              className="py-2 px-4 bg-black text-white  hover:bg-[rgba(0,0,0,0.8)]"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNowBtnClick}
              className="py-2 px-4 border-2 border-black text-black hover:bg-[rgba(0,0,0,0.1)]"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

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
            Reviews({product?.reviews?.length})
          </div>
        </div>
        <div className="border-2 py-6 px-4 text-wrap ">
          {descTab === "description"
            ? product.fullDescription
            :  <div className="py-6  text-wrap text-start flex flex-col gap-4 items-start">


<div className={`px-5 py-2 w-full bg-white border text-start rounded-xl`}>
       
          {[...Array(5)].map((_, index) => (
            <span
              className="text-[30px]"
              key={index}
              onClick={() => setRating(index + 1)}
              style={{
                color: index < rating ? "#F97316" : "gray",
                cursor: "pointer",
              }}
            >
              ★
            </span>
          ))}
          <form
            onSubmit={(e) => {

              e.preventDefault();
              addProductRating(product?._id, comment, rating);
            }}


            className="w-full "
          >
            <label className="font-semibold">Add Review</label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full border-2 border-[var(--primary-color)] outline-none px-2 py-1 rounded-xl"
            ></textarea>
            <button type="submit"  className='border px-4 mt-2 py-1 bg-[var(--dark-bg-color)] text-white'>Submit review{" "}<FontAwesomeIcon icon={faPlus}/></button>
          </form>
        
        </div>
             



            {product?.reviews?.map((review) => {
              return <ReviewCard review={review} />;
            })}
          </div>}
        </div>
      </div>
{/**rating */}

    </div>
  );
};
