
const OrderModel=require('../models/ordersModel')
exports.placeAnOrder=async(req,res)=>{
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
    
    }

exports.getAllOrdersOfAUser=async (req,res)=>{
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
    
    }

exports.getAllOrders=async (req,res)=>{

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
    }

exports.updateOrderStatus=async (req,res)=>{
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
    }