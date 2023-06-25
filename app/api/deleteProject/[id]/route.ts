import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { ProjectProps } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id: string}}){
    try{
        const data = await req.json();
        
        const userApiKey = data.apiKey;
        const currentUser = data.user;
        const projectId = params.id;
        
        
        if(!userApiKey || userApiKey.trim()==='')
            throw new Error("Invalid api key. Please provide a valid api key");
        if(!currentUser)
            throw new Error("No user was provided. Please try again later.");
        if(!projectId || projectId.trim()==='')
            throw new Error(`Cannot delete any projects with id of ${projectId}`);
        
        const user = await User.findOne({_id:currentUser._id,name:currentUser.name,email:currentUser.email,apiKey:userApiKey});

        if(!user)
            throw new Error('Cannot find and delete any projects within provided user.Please try again later.');
        console.log(user);

        const updatedUser = await User.findByIdAndUpdate({_id:currentUser._id,name:currentUser.name,email:currentUser.email,apiKey:userApiKey},{projects:user.projects.filter((project: ProjectProps)=>`${project._id}`!==projectId)},{new:true,runValidators:true});
        console.log(updatedUser);
        const deleteProject = await Project.findByIdAndDelete({_id:projectId});
        
        return NextResponse.json({ok:true,msg:"Post was successfully deleted",updatedUser});
        
    }catch(err){
        console.log(err);
        if(err instanceof mongoose.Error.CastError){
            return NextResponse.json({ok:false,msg:'Cannot delete your project. Please try again later.'});
        }
        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}