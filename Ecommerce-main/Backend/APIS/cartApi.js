const exp=require('express');

const cartApi=exp.Router();

cartApi.use(exp.json());

const expressAsyncHandler=require('express-async-handler');

cartApi.post('/add-item',expressAsyncHandler(async(request,response)=>{
    let cartCollection=request.app.get("cartCollection");
    let newItem=request.body
    await cartCollection.insertOne(newItem);
    response.send({message:"Added to cart"})
}))

cartApi.get('/all-items',expressAsyncHandler(async(request,response)=>{
    let cartCollection=request.app.get("cartCollection");
    let items=await cartCollection.find().toArray();
    response.send({message:"All items in cart",payload:items})
}))

cartApi.delete('/delete/:id',expressAsyncHandler(async(request,response)=>{
    let cartCollection=request.app.get("cartCollection");
    let id=request.params.id;
    await cartCollection.remove({Name:id})
    response.send({message:"item deleted successfully"})
}))

module.exports=cartApi