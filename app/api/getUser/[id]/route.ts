import connectDb from "@/lib/connectDB";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try{

        await connectDb(process.env.MONGO_URI!);
        
        const id = params.id;
        
        if(!id)
            throw new Error("No user id was provided. Please provide a valid id");

        const user = await User.findById({_id:id});

        if(!user)
            throw new Error(`Cannot find any user with id: ${id}`);

        return NextResponse.json({ok:true,user,msg:"User was found!"});
    }catch(err){
        
        if((err as Error).name==="CastError")
            return NextResponse.json({ok:false,msg:"The id is not a valid ObjectId."});

        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}