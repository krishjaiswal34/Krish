const fs=require('fs')
const cloudinary=require('../config/cloudinary')
const ProductModel=require('../models/productModel')

exports.uploadProduct= async (req, res) => {
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

exports.getAllProducts=async (req, res) => {
    const products = await ProductModel.find({});
    console.log("Req to get products >>", products);
    return res.json({ products: products });
  }

exports.addToCartProduct=async (req, res) => {
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
  }

exports.getAllCartProducts=async (req, res) => {
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
  }

exports.removeProductFromCart= async (req, res) => {
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
  }

exports.updateCartProduct=async (req, res) => {
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
  }

exports.delteAProduct=async(req,res)=>{
  try{
const _id=req.query.product_id
const deletedProduct=await ProductModel.findOneAndDelete({_id});
if (deletedProduct) {
  console.log("Product deleted");
  return res.status(200).json({"success":"Successfully deleted"});
} else {
  return res.status(400).json({"Error":"Error deleting  product"});
}
  
  }catch(error){
    console.log("Server error");
      return res.status(500).json({"ServerError":"Server error"});
  }

}