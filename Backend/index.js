const express =require('express')
const mongoose =require('mongoose');

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

