import { Project } from "@/models/Project";
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id: string}}){
    try{
        const projectId = params.id;
        if(!projectId || projectId.trim()==='')
            throw new Error('No project id was provided. Please try again later.');

        const project = await Project.findById({_id:projectId}).select('-projectPassword');
        if(!project)
            throw new Error(`No project with id ${projectId} was found`);
        
        return NextResponse.json({ok:true,project});
        
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return NextResponse.json({ok:false,msg:"Something went wrong while trying to access your account. Please try again later."});
        return NextResponse.json({ok:false,msg:(err as Error).message});    
    }
}