import React, { useContext} from "react";

import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "../../contexts/AdminContext";
import './ListedItemCard.css'

const ListedItemCard = ({ product }) => {

    const {deleteAProduct}=useContext(AdminContext);
  const thumbnail = product?.thumbnail;
  const price = parseInt(product?.price);
  console.log("priceiie:", price);
  const name = product?.name;
  const availableSizes=product?.sizes;
  const productId=product?._id;
  const category=product?.category;




  return (
    <div className="w-full sm:flex  px-4 py-4 gap-6 sm:h-[250px]">
      <div
       
        className="sm:w-1/3 w-full bg-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center sm:product-image h-[200px]"
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
          <h1 className=" ">Category</h1>
          <h1>{category}</h1>
        </div>
        <div className="flex justify-between items-center text-[rgba(0,0,0,0.6)] text-lg w-full ">
          <h1 className=" ">Category</h1>
          <h1 className="flex gap-1 flex-wrap">{availableSizes.map((size)=><h1>{size},</h1>)}</h1>
        </div>
        <div className="flex flex-wrap justify-between items-center w-full text-lg text-[rgba(0,0,0,0.6)]   ">
          <h1 className=" ">Product Id</h1>
          <h1 className="break-all max-w-full">{productId}</h1>
        </div>
 
        
      

        {/*Action buttons */}
        <div className="flex gap-4 mt-5 flex-wrap">
          <button
            onClick={() => deleteAProduct(product?._id)}
            className="py-2 px-4 outline-none bg-black text-white hover:bg-[rgba(0,0,0,0.8)]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListedItemCard;
