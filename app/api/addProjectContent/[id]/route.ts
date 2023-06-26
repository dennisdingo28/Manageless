import { NextRequest, NextResponse } from "next/server";
import decodeToken from "@/lib/decodeJWT";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/User";
import { Project } from "@/models/Project";
import { ProjectContentProps } from "@/types";
import mongoose from "mongoose";

export async function POST(req:NextRequest,{params}:{params:{id: string}}){
    try{
        const data = await req.json();
        
        const apikey = data.apiKey;
        const token = data.token;
        const projectId = params.id;
        const content = data.content;
        
        if(!data || Object.keys(data).length===0)
            throw new Error('No data was provided. Please try again later.');
        if(!projectId || projectId.trim()==='')
            throw new Error('No project id was provided. Please try again later.');
        if(!content)
            throw new Error('No content was provided. Please try again later.');
        if(!apikey || token.trim()==='')
            throw new Error('No api key was provided. Please try again later.');
        if(!token || token.trim()==='')
            throw new Error('No token was provided. Please try again later.');
            
        const decodedUser = await decodeToken(token) as JwtPayload;    
        
        if(!decodedUser || Object.keys(decodedUser).length===0)
            throw new Error("Cannot decode the user. Please try again later.");
        
        const user = await User.findOne({email:decodedUser.email,name:decodedUser.name,apiKey:apikey}).populate('projects',"projectTitle projectContent",Project);
        if(!user)
            throw new Error('Cannot find any user. Please try again later.');
        const project = await Project.findById({_id:projectId});
        if(!project)
            throw new Error('Cannot find and update your project. Please try again later.');
        
        const newProjectContent: ProjectContentProps = {};
        content.forEach((obj:ProjectContentProps)=>{
            const key = Object.keys(obj)[0];
            const value = obj[key];
            newProjectContent[key]=value;
        });

        const updatedProject = await Project.findByIdAndUpdate({_id:projectId},{projectContent:{...project.projectContent,...newProjectContent}},{new:true,runValidators:true}).select('-projectPassword');
        const updatedUser = await User.findOne({email:decodedUser.email,name:decodedUser.name,apiKey:apikey}).populate('projects',"projectTitle projectContent",Project);
        

        return NextResponse.json({ok:true,project:updatedProject,updatedUser})
    
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return NextResponse.json({ok:false,msg:"Something went wrong while trying to access your account. Please try again later"});
        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}