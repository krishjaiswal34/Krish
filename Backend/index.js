const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fs=require('fs')
dotenv.config();
//creating express app

const app = express();
app.use(express.json());
app.use(cors());
//PORT on that server run
const PORT = 8000;
//connecting server to DB

mongoose.connect("mongodb://127.0.0.1:27017/BaskitDB");
//product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },

    sizes: [String],
    smallDescription: {
      type: String,
      required: true,
    },
    thumbnail: { type: String, required: true },
    extraImages: [String],
    fullDescription: {
      type: String,
      required: true,
    },
    reviews: [
      {
        userEmail: {
          type: String,
        },
        userName: { type: String },
        rating: { type: Number },
        comment: { type: String },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//Product model
const ProductModel = mongoose.model("products", productSchema);

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

//express route for image upload

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
      sizes
    
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
            fs.unlinkSync(thumbnailFile.path)
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
                fs.unlinkSync(file.path)
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

//routes
//getting all products
app.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  console.log("Req to get products >>", products);
  return res.json({ products: products });
});

//listing product
app.post("/listProduct", async (req, res) => {
  const body = req.body;
  const { name, price } = body;
  console.log("body:", body);
  const listedProduct = await ProductModel.create({
    name: name,
    price: price,
  });
  return res.send("Product Listed >>>");
});
//adding product to the cart
app.post("/addToCart", (req, res) => {
  return res.send("Product adding to cart >>>");
});

app.listen(PORT, () => console.log("Server started at :", PORT));
