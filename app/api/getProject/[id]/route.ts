import { Project } from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id: string}}){
    try{
        const projectId = params.id;
        console.log(projectId);
        if(!projectId || projectId.trim()==='')
            throw new Error('No project id was provided. Please try again later.');

        const project = await Project.findById({_id:projectId}).select('-projectPassword');
        if(!project)
            throw new Error(`No project with id ${projectId} was found`);
        console.log(project);
        
        return NextResponse.json({ok:true,project});
        
    }catch(err){
        console.log(err);
        
    }
}