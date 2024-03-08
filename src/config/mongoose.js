import mongoose from "mongoose";
import dotenv from "dotenv";

//load all the env variables in application
dotenv.config();


const url = "mongodb+srv://abhishek4321u:1234@cluster0.puuwdx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export const connectUsingMongoose = async()=>{
   try{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true  
    })
        console.log("mongodb connected using mongoose");
    
   }catch(err){
    console.log(err);
   }
    
}

