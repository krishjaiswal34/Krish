const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const {
  uploadProduct,
  getAllProducts,
  addToCartProduct,
  getAllCartProducts,
  removeProductFromCart,
  updateCartProduct,
  delteAProduct
} = require("./controllers/productController");
const { registerUser } = require("./controllers/userController");
const {
  placeAnOrder,
  getAllOrdersOfAUser,
  getAllOrders,
  updateOrderStatus,
} = require("./controllers/orderController");
const uploadProductImages = require("./middlewares/uploadProductImagesMiddleware");
dotenv.config();
//creating express app

const app = express();
app.use(express.json());
app.use(cors());
//PORT on that server run
const PORT = 8000;
//connecting server to DB

mongoose.connect("mongodb://127.0.0.1:27017/BaskitDB");

app.post(
  "/upload",
  uploadProductImages,

  uploadProduct
);



//getting all products
app.get("/products", getAllProducts);

//user create route
app.post("/user", registerUser);

//adding product to the cart
app.post("/addToCart", addToCartProduct);
//getting cart products fro specific user
app.get("/cart", getAllCartProducts);

app.post("/removeProduct", removeProductFromCart);

app.post("/updateCartProduct", updateCartProduct);
//placing order
app.post("/placeOrder", placeAnOrder);
//fetching orders for specific user
app.get("/userOrders", getAllOrdersOfAUser);
//all orders
app.get("/orders", getAllOrders);
//update order status by admin
app.post("/updateOrderStatus", updateOrderStatus);
//to delete a product
app.delete('/deleteAProduct',delteAProduct);

app.listen(PORT, () => console.log("Server started at :", PORT));
