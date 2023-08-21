const exp=require('express');
const booksApi=exp.Router();

booksApi.use(exp.json());

const expressAsyncHandler=require('express-async-handler');

//route to get all books
booksApi.get('/all-books',expressAsyncHandler(async (request,response)=>{
    let booksCollection=request.app.get("booksCollection");
    let books=await booksCollection.find().toArray();
    response.send({message:"all books",payload:books});
}))

//route to add a book
booksApi.post('/add-book',expressAsyncHandler(async(request,response)=>{
    let newBook=request.body
    let booksCollection=request.app.get("booksCollection");
    await booksCollection.insertOne(newBook);
    response.send({message:"Book added successfully"});
}))

//route to update a book
booksApi.put('/update-book/:id',expressAsyncHandler(async (request,response)=>{
    let booksCollection=request.app.get("booksCollection")
    await booksCollection.updateOne({bookID:(+(request.params.id))},{$set:{...request.body.modifiedBook}})
    response.send("Update Successful")
}))

//route to delete a book 
booksApi.delete('/delete-book/:id',expressAsyncHandler(async (request,response)=>{
    let bookId=(request.params.id)
    let booksCollection=request.app.get("booksCollection");
    await booksCollection.deleteOne({bookID:bookId})
}))

module.exports=booksApi;