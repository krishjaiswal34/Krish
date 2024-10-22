const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({

    userAuthId:{
        type:String,
        required:true,
    },
    shipingInfo:{
        type:Object,
        required:true,
    },
    product:{
        type:Object,
        type:String,
    }

},{
    timestamps:true
})

 const OrderModel=mongoose.model('orders',orderSchema);
 module.exports=OrderModel;
