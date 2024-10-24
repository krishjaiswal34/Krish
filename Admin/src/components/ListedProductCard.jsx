import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { AdminContext } from "../contexts/adminContext";


const ListedProductCard = ({ product }) => {
  const {deleteAProduct}=useContext(AdminContext);
  return (
    <div className="h-[100px] text-start px-4  flex justify-between items-center gap-2 border-2  ">
      <div className="gap-6 w-2/6 h-full flex items-center justify-center ">
        <div className="h-full">
          <img className="h-full" src={product.thumbnail} alt="image" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-lg">${product.price}</p>
         
        </div>
      </div>
<FontAwesomeIcon onClick={()=>deleteAProduct(product._id)} className="cursor-pointer" icon={faTrash}/>
 
    </div>
  );
};

export default ListedProductCard;
