const express =require('express')
const mongoose =require('mongoose');
const dotenv=require('dotenv')
const multer =require('multer')
const cloudinary  =require('cloudinary').v2
dotenv.config();
//creating express app

const app=express();
app.use(express.json())
//PORT on that server run
const PORT=8000;
//connecting server to DB



mongoose.connect('mongodb://127.0.0.1:27017/BaskitDB')
//product schema
const productSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true,
},
imageUrl:{
    type:String,
    required:true
}
// sizes:[String],
// smallDescription:{
//     type:String,
//     required:true

// },
// thumbnail:{type:String , required:true},
// images:[String],
// description:{
//     type:String,
//     required:true
// },
// reviews:[
//     {
//         userEmail:{
//             type:String,
            
//         },
//         userName:{type:String},
//         rating:{type:Number},
//         comment:{type:String},
//         createdAt:{
//             type:Date,
//             default:Date.now
//         }

//     },
//     {
//         timestamps:true
//     }
   
   
// ]




},{
    timestamps:true
})
//Product model
const ProductModel= mongoose.model('products',productSchema);

//congig Cloudinary

cloudinary.config({
    cloud_name: 'dehayahmp',
    api_key: '621741153637819',
    api_secret:'In1ujDkaexCytU3yvMeJOQQdyKo',
  });

///MULTER setup ,

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder to store images temporarily
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
  });

  const upload=multer({storage:storage});

//express route for image upload

app.post('/upload',upload.single('image'),async(req,res)=>{

    const {name,price}=req.body;

    //upload image to cloudinary
    const filPath=req.file.path;
    console.log("file:",req.file)
    console.log("FilePath is :",filPath)
  
    if(filPath){

        try{

            const result =await cloudinary.uploader.upload(filPath,{
                folder:'clothes',
                
            },);
        
            ProductModel.create({
                name:name,
                price:price,
                imageUrl:result.secure_url
            })
            return res.json({imageURL:result.secure_url})
          }catch(error){
            console.log("Error uploading cloudinary:",error)
            return res.status(500).json({"Error":"Error uploading to cloudinary"})
          }
    }
    else{
        console.log("file not found")
        return res.json({"Error":"File not found"})
    }
 

    



})






//routes
//getting all products
app.get('/products',async (req,res)=>{
const products=await ProductModel.find({});
console.log("Req to get products >>",products)
    return res.json({"products":products})
})

//listing product
app.post('/listProduct',async (req,res)=>{
    const body=req.body;
    const {name,price}=body;
    console.log("body:",body)
 const listedProduct=await ProductModel.create({
     name:name,
     price:price,
    
})
    return res.send("Product Listed >>>")
})
//adding product to the cart
app.post('/addToCart',(req,res)=>{
    return res.send("Product adding to cart >>>")
})


app.listen(PORT,()=>console.log("Server started at :",PORT))

