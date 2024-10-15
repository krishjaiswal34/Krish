import { createContext, useEffect, useState } from "react";

import { products as productsList } from "../assets/MockData";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";

const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [logedInUser, setLogedInUser] = useState();

  const fetchProducts = async () => {
    try {
      fetch("http://localhost:8000/products").then(async (response) => {
        const responseData = await response.json();
        console.log("fetched products:", responseData);
        setProducts(responseData.products);
      });
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchCartProducts = async () => {
    fetch(`http://localhost:8000/cart?userAuthId=${logedInUser.uid}`).then(
      async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          console.log("Cart data retrieved", responseData.cart);
          setCartProducts(responseData.cart);
        }
      }
    );
  };

  const addProductToUserCart = (product, sizeToBuy, quantityToBuy) => {
    const userAuthId = logedInUser.uid;

    fetch("http://localhost:8000/addToCart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userAuthId: userAuthId,
        product: product,
        sizeToBuy: sizeToBuy,
        quantityToBuy: quantityToBuy,
      }),
    })
      .then((product) => {
        fetchCartProducts();
        alert("Added to cart");
      })
      .catch((err) => alert("Error adding to cart"));
  };

  const removeProductFromUserCart = (product_id) => {
    const userAuthId = logedInUser.uid;

    fetch("http://localhost:8000/removeProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userAuthId: userAuthId,
        product_id: product_id,
      }),
    })
      .then(() => {
        alert("Product removed");
        fetchCartProducts();
      })
      .catch(() => alert("Unexpected error"));
  };

  const updateCartProduct = (product_id, newQuantity) => {
    const userAuthId = logedInUser.uid;

    fetch("http://localhost:8000/updateCartProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userAuthId: userAuthId,
        product_id: product_id,
        newQuantity: newQuantity,
      }),
    })
      .then(() => {
        alert("Updated");
        fetchCartProducts();
      })
      .catch(() => alert("Unexpected error"));
  };
  useEffect(() => {
    const userResult = onAuthStateChanged(firebaseAuth, (user) => {
      setLogedInUser(user);
    });
  });

  useEffect(() => {
    fetchProducts();

    if (logedInUser) {
      fetchCartProducts();
    } else {
      setCartProducts(null);
    }
  }, [logedInUser]);

  return (
    <ProductContext.Provider
      value={{
        products,
        cartProducts,
        addProductToUserCart,

        logedInUser,
        removeProductFromUserCart,
        updateCartProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
