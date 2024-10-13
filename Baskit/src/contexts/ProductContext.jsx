import { createContext, useEffect, useState } from "react";

import { products as productsList } from "../assets/MockData";
import {onAuthStateChanged} from 'firebase/auth'
import { firebaseAuth } from "../utils/firebaseAuth";

const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [logedInUser,setLogedInUser]=useState();


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

  const fetchCartProducts=async()=>{

        fetch(`http://localhost:8000/cart?userAuthId=${logedInUser.uid}`).then(async(response)=>{
          if(response.ok){
            const responseData=await response.json();
            console.log("Cart data retrieved",responseData.cart)
            setCartProducts(responseData.cart)
          }
        })
      
    

  }

  const addProductToUserCart=(product)=>{

const userAuthId=logedInUser.uid;

    fetch('http://localhost:8000/addToCart',{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "userAuthId":userAuthId,
            "product":product
        })
    }).then((product)=>alert("Added to cart")).catch((err)=>alert("Error adding to cart"))
    
    } 

useEffect(()=>{
  const userResult=onAuthStateChanged(firebaseAuth,(user)=>{
    setLogedInUser(user)

  })

})


  useEffect(() => {

    fetchProducts();

    if(logedInUser){
      fetchCartProducts();
    }
   
  }, [logedInUser]);

  return (
    <ProductContext.Provider
      value={{
        products,
        cartProducts,
        addProductToUserCart,
        addProductToUserCart,
        logedInUser
        
       
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
