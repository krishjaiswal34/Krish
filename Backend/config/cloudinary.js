const cloudinary = require("cloudinary").v2;
const CLOUND_NAME=process.env.CLOUDINARY_CLOUD_NAME
const API_KEY=process.env.CLOUDINARY_API_KEY
const APP_SECRET_KEY=process.env.CLOUDINARY_API_SECRET
cloudinary.config({
    cloud_name: CLOUND_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
  });

module.exports=cloudinary