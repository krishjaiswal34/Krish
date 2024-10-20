const mongoose=require('mongoose')

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
      isFeatured:{
        type:Boolean
      }
    },
    {
      timestamps: true,
    }
  );
  //Product model
  const ProductModel = mongoose.model("products", productSchema);

module.exports=ProductModel