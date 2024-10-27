import React from "react";

import { useContext } from "react";
import { AdminContext } from "../contexts/adminContext";
import ListedItemCard from "../components/ListedItemCard/ListedItemCard";

export const ListedProductsView = () => {
  const { listedProducts } = useContext(AdminContext);

  return (
    <div className="py-6 px-10 text-start flex flex-1 flex-col gap-4">
      {listedProducts.length > 0 ? (
        listedProducts.map((product) => {
          return <ListedItemCard product={product} />;
        })
      ) : (
        <p>No product yet listed</p>
      )}
    </div>
  );
};
