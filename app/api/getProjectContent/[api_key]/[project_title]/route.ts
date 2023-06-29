import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { ProjectProps } from "@/types";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{api_key:string, project_title: string}}){
    try{

        if(!params)
            throw new Error('No parameters were provided. Please provide a valid api key and project title. Check our docs.');
        if(!params.api_key)
            throw new Error('No api key was provided. Please provide your api key.');
        if(!params.project_title)
            throw new Error('No project title was provided. Please try again later.');
        const user = await User.findOne({apiKey:params.api_key}).populate('projects',"projectTitle projectContent",Project);
        if(!user)
            throw new Error('No user with provided api key was found.');

        const project = user.projects.find((project: ProjectProps)=>project.projectTitle===params.project_title);
        if(!project)
            throw new Error(`Cannot find any post with project title ${params.project_title}`);
        return NextResponse.json({ok:true,projectContent:project.projectContent});

    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return NextResponse.json({ok:false,msg:"Something went wrong while trying to access your data."});
        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}