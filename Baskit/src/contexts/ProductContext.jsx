import { createContext, useEffect, useRef, useState } from "react";


import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuth";
import { toast, ToastContainer } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
         
          setCartProducts(responseData.cart.reverse());
        }
      }
    ).catch((err)=>{console.log("Error fetching cart products:",err);})
  };

  const addProductToUserCart = (product, sizeToBuy, quantityToBuy) => {
    const userAuthId = logedInUser.uid;
const id=toast.loading('Adding to cart',{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
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
       
       toast.update(id,{ render: "Product added successfully!",
       type: "success", // Change type to 'success' to get green color
       isLoading: false, // Mark it as not loading anymore
       autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
        fetchCartProducts();
        return true
       
      })
      .catch((err) => {toast.update(id,{render:'Error adding to cart',type:'error',isLoading:false,autoClose:3000,style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'}); return false;});
  };

  const removeProductFromUserCart = (product_id) => {
    const userAuthId = logedInUser.uid;
const id=toast.loading("Removing from cart",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
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
        toast.update(id,{ render: "Product removed successfully ",
        type: "success", // Change type to 'success' to get green color
        isLoading: false, // Mark it as not loading anymore
        autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
      })
      .catch((err) => {console.log("error:",err)
      toast.update(id,{ render: "Error removing product",
      type: "error", 
      autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    
    });
  };

  const updateCartProduct = (product_id, newQuantity) => {
    const userAuthId = logedInUser.uid;
const id=toast.loading('Updating cart product',{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
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
       
        if (response.ok) {
          const responseData = await response.json();

          if (responseData) {
            toast.update(id,{ render: "Product updated successfully ",
            type: "success", // Change type to 'success' to get green color
            isLoading: false, // Mark it as not loading anymore
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
            fetchCartProducts();
          }
        }
      })
      .catch((err) => {
       
        console.warn("Unexpectedc error", err);
        toast.update(id,{render: "Error updating cart product",
        type: "error", // Change type to 'error' to get green color
        isLoading: false, // Mark it as not loading anymore
        autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
      });
  };


  const addProductRating = (product_id, comment, rating) => {
    const userEmail = logedInUser?.email;
    const userName = logedInUser.displayName
      ? logedInUser.displayName
      : "No name";
   const id=toast.loading("Adding rating",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
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
            toast.update(id,{ render: "Rating submited",
            type: "success", // Change type to 'success' to get green color
            isLoading: false, // Mark it as not loading anymore
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          }
        }
      })
      .catch((err) => {
        toast.update(id,{ render: "Error submiting rating ",
        type: "error", // Change type to 'success' to get green color
        isLoading: false, // Mark it as not loading anymore
        autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
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
