import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SizeSelectOption from "../../components/SizeSelectOption";
import { Button } from "../../components/Button";
import { SmallImage } from "../../components/SmallImage";

export const ProductDetailPage = () => {
  const loacation = useLocation();
  const { product } = loacation.state || {};
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <div>
      <hr />
      <div className="flex gap-10 w-full h-[80vh] py-8">
        <div className="w-1/2 flex gap-4">

          <div className="flex flex-col gap-4 w-[300px]">
            {
              product.extraImages.map((image,index)=>{
                return <SmallImage image={image}/>
              })
            }
            
          </div>

          <div className="bg-[rgba(0,0,0,0.1)] px-2 h-full flex justify-center items-center">
            <img className="flex-1" src={product.thumbnail} alt="image" />
          </div>
        </div>

        {/* procuct description */}

        <div className="w-1/2 text-start">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex gap-1 text-orange-500 text-base mt-4">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p className="text-2xl font-semibold my-6">{'$'+product.price}</p>

          <p className="mb-6">
            {
              product.smallDescription
            }
          </p>
          <p className="text-[17px]">Select size</p>
          <div className="flex gap-2 mt-4 mb-8">
            {
              product.sizes.map((size,index)=>{
                return <SizeSelectOption text={size}/>
              })
            }
            
          </div>

          <Button text={"ADD TO CART"} />
        </div>
      </div>

<div className="my-10">

<div className="flex">
<div className="border-2 py-2 px-4 ">Description</div>
<div className="border-2 py-2 px-4">Reviews</div>
</div>
<div className="border-2 py-6 px-4">
{
  product.fullDescription
}
</div>
</div>
    </div>
  );
};
