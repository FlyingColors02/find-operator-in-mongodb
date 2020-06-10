let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/FindOperatorDemo",{ useNewUrlParser: true ,useUnifiedTopology: true })
        .then(()=>console.log("Database got connected:)"))
        .catch((error)=>console.log("Something went wrong!!",error.message));


let booksCollSchema = new mongoose.Schema(
    {
        name:{type:String},
        author:{type:String},
        type:[String],
        isPublished:{type:Boolean},
        price:{type:Number},
        date:{type:Date,default:Date.now()}
    }
);

let bookCollModel = mongoose.model("booksCollection",booksCollSchema);

//creating data item
async function CreateData(){
    let data= new bookCollModel(
        {
            name:"Romeo Juliet",
            author:"Shakespear",
            type:["romantic","fantacy"],
            isPublished:true,
            price:400
        }
    );
    let item = await data.save();
   // console.log(item);
}
//CreateData();


//fetch all records(find())
async function FetchBooks(){
    let book=await bookCollModel.find();
    // console.log(book);
}
FetchBooks();


//fetch particular data(find(parameter))
async function FetchBooksColl(){
    let book1=await bookCollModel.find({name:"Romeo Juliet"});
   // console.log(book1);
}
FetchBooksColl();


//fetch specific info in particular data(select operator)
async function FetchSpecificInfo(){
    let book1=await bookCollModel.find({name:"Romeo Juliet"})
    .select("price author");
   // console.log(book1);
}
FetchSpecificInfo();

//different types of Operator
async function DiffTypesOfOperation(){
 let book=await bookCollModel
            .find()
            .select("-price")
            .sort("name")
            .limit(4);
    //console.log(book);
}
DiffTypesOfOperation();


//comparison Operator
async function ComparisonOperator(){
    let book = await bookCollModel
                .find({
                   // price:{$gt:100, $lte:350}
                   price:{$in:[400]}
                });
   // console.log(book);
} 
ComparisonOperator();


//Logical Operator(or and)
async function LogicalOperator(){
    let book= await bookCollModel
            // .find().or([{name:"Romeo Juliet"},{price:350}]);
            .find().and([{name:"Romeo Juliet"},{price:400}]);
            console.log(book);
}
LogicalOperator();