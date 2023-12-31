import { NextRequest, NextResponse } from "next/server";
import decodeToken from "@/lib/decodeJWT";
import { User } from "@/models/User";
import { JwtPayload } from "jsonwebtoken";
import { Project } from "@/models/Project";
import mongoose from "mongoose";
import { ProjectCardProps } from "@/types";

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        
        if(!data || Object.keys(data).length===0)
            throw new Error("Payload was empty. Please try again later.");
        if(!data.inputProjectName || data.inputProjectName.trim()==='')
            throw new Error("Project title is empty. Please fill in the fields.");
        if(!data.inputProjectPassword || data.inputProjectPassword.trim()==='')
            throw new Error('Project password is empty. Please fill in the fields.');
        const userApiKey = data.apiKey;
        const token = data.token;
        if(!token || token.trim()===''){
            throw new Error('No token was provided. Please try again later.');
        }
        if(!userApiKey)
            throw new Error("No api key was provided. Please try again later.");
        const decodedUser = await decodeToken(data.token) as JwtPayload;
        if(!decodedUser || Object.keys(decodedUser).length===0)
            throw new Error("Cannot decode the user. Please try again later.");
        
        const findUser = await User.findOne({email:decodedUser.email,name:decodedUser.name}).populate("projects","projectTitle",Project);
        if(!findUser)
            throw new Error("Cannot find any user with provided details.");
        if(findUser.apiKey!==userApiKey)
            throw new Error("User api key doesn't match with the provided one.");
        console.log(findUser);
        
        const titleProjectDuplicate = findUser.projects.find((project: ProjectCardProps)=>project.projectTitle===data.inputProjectName);
        console.log(titleProjectDuplicate);
        
        if(titleProjectDuplicate)
            throw new Error(`Title ${data.inputProjectName} already exists!`);
            
        const newProject = await Project.create({projectTitle:data.inputProjectName,projectPassword:data.inputProjectPassword});
        const updatedUser = await User.findOneAndUpdate({email:decodedUser.email,name:decodedUser.name},{$push:{projects:newProject._id}},{new:true,runValidators:true});
        const currentUser = await User.findById({_id:updatedUser._id}).populate("projects");

        return NextResponse.json({ok:true,updatedUser:currentUser});
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return NextResponse.json({ok:false,msg:"Something went wrong while trying to access your account. Please try again later."});
        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}