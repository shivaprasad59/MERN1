const exp=require('express');
const expressAsyncHandler = require('express-async-handler');

const ElenctronicsApi=exp.Router();

ElenctronicsApi.use(exp.json())

ElenctronicsApi.get('/all-ele',expressAsyncHandler(async(request,response)=>{
    let eleCollection=request.app.get("eleCollection");
    let ele=await eleCollection.find().toArray();
    response.send({message:"All electronics",payload:ele});
}))

ElenctronicsApi.post('/add-ele',expressAsyncHandler(async(request,response)=>{
    let eleCollection=request.app.get("eleCollection");
    let newEle=request.body;
    await eleCollection.insertOne(newEle);
    response.send({message:"element added successfully"});
}))

ElenctronicsApi.delete('/remove/:id',expressAsyncHandler(async(request,response)=>{
    let id=+(request.params.id);
    let eleCollection=request.app.get("eleCollection");
    await eleCollection.deleteOne({eleID:id})
}))

module.exports=ElenctronicsApi;