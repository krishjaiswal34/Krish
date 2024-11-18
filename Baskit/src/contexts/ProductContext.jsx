import { createContext, useEffect, useRef, useState } from "react";


import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";
import { toast, ToastContainer } from "react-toastify";

const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [shopProducts,setShopProducts]=useState(products);
  const [cartProducts, setCartProducts] = useState([]);
  const [logedInUser, setLogedInUser] = useState();
  const latesCollectionRef = useRef();
  const SERVER_URL=import.meta.env.VITE_SERVER_URL

  const scrollToView = (sectionId) => {
    if (sectionId === "latestcollections") {
      latesCollectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchProducts = async () => {
    try {
      fetch(`${SERVER_URL}/products`).then(async (response) => {
        const responseData = await response.json();
        console.log("fetched products:", responseData);
        setProducts(responseData.products);
      });
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchCartProducts = async () => {
    fetch(`${SERVER_URL}/cart?userAuthId=${logedInUser.uid}`).then(
      async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          console.log("Cart data retrieved", responseData.cart);
          setCartProducts(responseData.cart.reverse());
        }
      }
    ).catch((err)=>{console.log("Error fetching cart products:",err);alert("Error fetching cart products")})
  };

  const addProductToUserCart = (product, sizeToBuy, quantityToBuy) => {
    const userAuthId = logedInUser.uid;

    fetch(`${SERVER_URL}/addToCart`, {
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
        toast.success("Product Added to Cart !");
        fetchCartProducts();
       
      })
      .catch((err) => alert("Error adding to cart"));
  };

  const removeProductFromUserCart = (product_id) => {
    const userAuthId = logedInUser.uid;

    fetch(`${SERVER_URL}/removeProduct`, {
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
        fetchCartProducts();
        toast.success("Product removed !", { position: "top-right" });
      })
      .catch(() => alert("Unexpected error"));
  };

  const updateCartProduct = (product_id, newQuantity) => {
    const userAuthId = logedInUser.uid;

    fetch(`${SERVER_URL}/updateCartProduct`, {
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
      .then(async (response) => {
        console.log("updated cart product is ok")
        if (response.ok) {
          const responseData = await response.json();

          if (responseData) {
            toast.success("Cart Product Updated !", { position: "top-right" });
            fetchCartProducts();
          }
        }
      })
      .catch((err) => {
        alert("Unexpected error");
        console.warn("Unexpectedc error", err);
      });
  };


  const addProductRating = (product_id, comment, rating) => {
    const userEmail = logedInUser?.email;
    const userName = logedInUser.displayName
      ? logedInUser.displayName
      : "No name";
    console.log("ll", product_id, comment, rating, userEmail);
    fetch(`${SERVER_URL}/productRatingAndReview`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        product_id,
        comment,
        rating,
        userEmail,
        userName,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          if (responseData) {
            toast.success("Thanks for adding review !");
          }
        }
      })
      .catch((err) => {
        toast.error("Unexpected error");
      });
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
        latesCollectionRef,
        scrollToView,
        addProductRating,
        shopProducts,
        setShopProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
