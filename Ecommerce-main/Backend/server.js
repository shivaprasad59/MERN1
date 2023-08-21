const { response } = require('express');
const exp=require('express');
const app=exp();
const cors=require('cors')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
const PORT=8080;


//connecting to database using database link
const DBURL="mongodb+srv://medipallyabinay:Abhinay%4044@firstculsterma.gkbwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//importing mongo client
const mongoclient=require("mongodb").MongoClient;

//connecting to mongo client
mongoclient.connect(DBURL)
.then((client)=>{
    //posts is a collection in the database retrive it
    const databaseObject=client.db("aauroaBackend");
    let userCollection=databaseObject.collection("userCollectionEkart");
    let bookdCollection=databaseObject.collection("booksCollection");
    let eleCollection=databaseObject.collection("electronicsCollection");
    let cartCollection=databaseObject.collection("cartCollection")
    //setting collection object
    app.set("userCollection",userCollection);
    app.set("booksCollection",bookdCollection);
    app.set("eleCollection",eleCollection);
    app.set("cartCollection",cartCollection);
    //verifying if database is connected properly
    console.log("DB conncetion successfull");
})
.catch((err)=>{
    console.log("failed to connect database to the application",err)
})

app.use(exp.json())

//importing userApis
const userApis=require('./APIS/userApis.js');
app.use('/users',userApis);

//importing booksApi
const booksApi=require('./APIS/booksApis');
app.use('/books',booksApi);

//importing eleApi
const eleApi=require('./APIS/ElectronicsApi');
app.use('/ele',eleApi);

//importing cartApi
const cartApi=require('./APIS/cartApi');
app.use('/cart',cartApi);

//Middleware to handle errors
app.use((error,request,response,next)=>{
    response.send({Message:`Error Occured`,Error_type:`${error}`})
})

//Middleware to handle invalid path
app.use((request,response,next)=>{
    response.send({Message:`Invalid path: The path ${request.url} is invalid`})
})
app.listen(PORT,()=>console.log(`app is listening on ${PORT}`));

