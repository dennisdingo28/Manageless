import mongoose from "mongoose";

let isConnected: boolean = false;

export default async function connectDb(mongoUri: string){
    mongoose.set('strictQuery',true);

    try{
        if(isConnected){
            console.log('MongoDB is already connected!'); 
            return;
        }

        if(!mongoUri)
            throw new Error("Cannot connect to the database. Please try again later!")
        const connect = await mongoose.connect(mongoUri,{
            dbName:"Manageless",
        });
        console.log('MongoDB connected!');
        
    
    }catch(err){
        console.log(err);
        
    }
}