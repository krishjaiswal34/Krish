const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ProductModel = require("./models/productModel");
const userModel = require("./models/userModel");
const { v4: uuidv4 } = require("uuid");
const { error } = require("console");
const OrderModel = require("./models/ordersModel");
dotenv.config();
//creating express app

const app = express();
app.use(express.json());
app.use(cors());
//PORT on that server run
const PORT = 8000;
//connecting server to DB

mongoose.connect("mongodb://127.0.0.1:27017/BaskitDB");

//congig Cloudinary

cloudinary.config({
  cloud_name: "dehayahmp",
  api_key: "621741153637819",
  api_secret: "In1ujDkaexCytU3yvMeJOQQdyKo",
});

///MULTER setup ,

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file:", file);
    console.log("body from multer fun", req.body);
    cb(null, "uploads/"); // Folder to store images temporarily
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

//product list route
app.post(
  "/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "extraImages", maxCount: 5 },
  ]),
  async (req, res) => {
    console.log("req body:", req.body);
    const {
      name,
      price,
      smallDescription,
      fullDescription,
      category,
      subCategory,
      sizes,
      isFeatured,
    } = req.body;

    //upload image to cloudinary

    const files = req.files;
    console.log("file::::", req.files);

    if (files) {
      try {
        const thumbnailFile = req.files["thumbnail"][0];
        const extraImagesFiles = req.files["extraImages"];

        console.log("thumbnailfile:", thumbnailFile);
        console.log("extraimagesfiles:", extraImagesFiles);

        ///geting cloudinary url for thumbnail image
        const thumbnailImageResult = await cloudinary.uploader.upload(
          thumbnailFile.path,
          {
            folder: "clothes",
          },
          (error, result) => {
            fs.unlinkSync(thumbnailFile.path);
            if (error) {
              return res.status(500).json({ "cloudinaryErro:": error });
            }
          }
        );
        const thumbnailCloudinaryUrl = thumbnailImageResult.secure_url;

        ///geting cloudinary url for extraimages

        const extraImagesCloudinaryUrls = [];

        for (const file of extraImagesFiles) {
          const result = await cloudinary.uploader.upload(
            file.path,
            {
              folder: "clothes",
            },
            (error, result) => {
              fs.unlinkSync(file.path);
              if (error) {
                return res
                  .status(401)
                  .json({ Error: `Cloudinary error ${error}` });
              }
            }
          );

          extraImagesCloudinaryUrls.push(result.secure_url);
        }
        console.log("thumbnailImageCloudinaryURL::", thumbnailCloudinaryUrl);
        console.log("ExtraImageCloudinaryURL::", extraImagesCloudinaryUrls);

        ////adding data to databse

        if (thumbnailCloudinaryUrl && extraImagesCloudinaryUrls) {
          const result = await ProductModel.create({
            name: name,
            price: price,
            smallDescription: smallDescription,
            fullDescription: fullDescription,
            sizes: sizes,
            category: category,
            subCategory: subCategory,
            thumbnail: thumbnailCloudinaryUrl,
            extraImages: extraImagesCloudinaryUrls,
            isFeatured: isFeatured,
          })
            .then((result) => {
              console.log("mongodb result::", result);
              return res.json("Successfully product listed");
            })
            .catch((error) => {
              return res.json("mongoDB error:", error);
            });
        }
      } catch (error) {
        console.log("Error uploading cloudinary:", error);
        return res.status(500).json({ Error: "Error uploading to cloudinary" });
      }
    } else {
      console.log("file not found");
      return res.json({ Error: "File not found" });
    }
  }
);

//getting all products
app.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  console.log("Req to get products >>", products);
  return res.json({ products: products });
});

//user create route
app.post("/user", async (req, res) => {
  const { userAuthId } = req.body;
  console.log("userAuthId::", userAuthId);
  try {
    const user = await userModel
      .create({ userAuthId: userAuthId })
      .then((user) => {
        console.log("user created :", user);
        return res.json("User created");
      })
      .catch((err) => {
        console.log("error creating user", err);
        return res.json("error creating user", err);
      });
  } catch (error) {
    console.log("Server error");
    return res.json("Server error");
  }
});

//adding product to the cart
app.post("/addToCart", async (req, res) => {
  const { userAuthId, product, sizeToBuy, quantityToBuy } = req.body;

  const product_id = uuidv4();

  try {
    const result = await userModel
      .findOneAndUpdate(
        { userAuthId },
        {
          $push: {
            cart: {
              product_id,
              product,
              sizeToBuy,
              quantityToBuy,
            },
          },
        }
      )
      .then((pr) => {
        console.log("Product added:", pr);
        return res.json("product added");
      })
      .catch((err) => {
        console.log("Error adding product tot cart");
        return res.json("Error adding product to cart");
      });
  } catch (err) {
    console.log("Server eror");
    return res.json("Server error");
  }
});
//getting cart products fro specific user
app.get("/cart", async (req, res) => {
  try {
    const userAuthId = req.query.userAuthId;
    console.log("accessing cart data of userAuthId", userAuthId);
    const userData = await userModel.findOne({ userAuthId });
    if (userData) {
      console.log("userData:", userData);
      return res.status(200).json({ cart: userData.cart });
    } else {
      return res.status(400).json({ error: "User Cart not foutn" });
    }
  } catch (err) {
    return res.status(500).json({ err: "Server error" });
  }
});

app.post("/removeProduct", async (req, res) => {
  try {
    const { userAuthId, product_id } = req.body;

    const result = await userModel.findOneAndUpdate(
      { userAuthId },
      { $pull: { cart: { product_id: product_id } } }
    );
    if (result) {
      return res.send("Product removed from cart");
    } else {
      return res.status(404).json("User or product not found");
    }
  } catch (err) {
    return res.status(500).json("Server error");
  }
});
app.post("/updateCartProduct", async (req, res) => {
  try {
    const { product_id, userAuthId, newQuantity } = req.body;
    console.log(
      "update:",
      "product_id:",
      product_id,
      "quantity :",
      newQuantity,
      "userId:",
      userAuthId
    );
    const updatedProduct = await userModel.findOneAndUpdate(
      { userAuthId, "cart.product_id": product_id },
      { $set: { "cart.$.quantityToBuy": newQuantity } },
      { new: true }
    );
    console.log("update product :", updatedProduct);
    if (updatedProduct) {
      console.log("product cart item updated");
      return res.status(200).json("Successfully updated");
    } else {
      return res.status(400).json("Error updating cart product");
    }
  } catch (err) {
    console.log("Server error");
    return res.status(500).json("Server error");
  }
});
//placing order
app.post('/placeOrder',async(req,res)=>{
console.log("placedOrder route hit",req.body)
try{
  const {userAuthId,shipingInfo,product,status}=req.body;
  const result=await OrderModel.create({
    userAuthId,
    shipingInfo,
    product,
    status
  })

  if(result){
    return res.status(200).json({"success":"Successfully order placed"})
  }
  else{
    return res.status(400).json({"Error":"Error placing order"})
  }
}
catch(error){
  return res.json({"ServerError":error})
}

})
//fetching orders for specific user
app.get('/userOrders',async (req,res)=>{
console.log("userOrders hit")
try{
  const {userAuthId}=req.query;
  console.log("userAuth id b query:",userAuthId)
  const orders=await OrderModel.find({userAuthId});
  if(orders){
    console.log("orders",orders)
    return res.status(200).json({"orders":orders})
  }else{
    return res.status(400).json({"Error":"Error fetching orders"})
  }

}catch(error){
  return res.status(500).json({"ServerError":error})
}

})
//all orders
app.get('/orders',async (req,res)=>{

try{
  const orders=await OrderModel.find({});
  if(orders){
    return res.status(200).json({"orders":orders})

  }
  else{
    return res.status(400).json({"error":"orders not found"})
  }
}catch(error){
  return res.status(500).json({"Error":"Server error"})
}
});
//update order status by admin
app.post('/updateOrderStatus',async (req,res)=>{
console.warn("updateORder route hit",)
try{
  const {_id,newStatus}=req.body;
  console.log(_id,newStatus)

  const updateOrder=await OrderModel.findOneAndUpdate({_id},{status:newStatus},{new:true})
  console.log("updateOrder:",updateOrder)

  if(updateOrder){
    return res.status(200).json({"Success":"Successfully updated order status"})
  }else{
    return res.status(400).json({"Error":"Error updating order status"})
  }

}catch(error){
  console.log("server error",error)
  return res.status(500).json({"ServerError":error})
  
}
})
app.listen(PORT, () => console.log("Server started at :", PORT));
