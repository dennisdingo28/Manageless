import { NextRequest, NextResponse } from "next/server";
import decodeToken from "@/lib/decodeJWT";
import { User } from "@/models/User";
import { JwtPayload } from "jsonwebtoken";
import { Project } from "@/models/Project";
import mongoose from "mongoose";

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        if(!data || Object.keys(data).length===0)
            throw new Error("Payload was empty. Please try again later.");
        
        const userApiKey = data.apiKey;
        if(!userApiKey)
            throw new Error("No api key was provided. Please try again later.");

        const decodedUser = await decodeToken(data.token) as JwtPayload;
        if(!decodedUser || Object.keys(decodedUser).length===0)
            throw new Error("Cannot decode the user. Please try again later.");
        
        const findUser = await User.findOne({email:decodedUser.email,name:decodedUser.name});
        if(!findUser)
            throw new Error("Cannot find any user with provided details.");
        if(findUser.apiKey!==userApiKey)
            throw new Error("User api key doesn't match with the provided one.");
        
        const newProject = await Project.create({projectTitle:"test",projectPassword:"1234"});
        const updatedUser = await User.findOneAndUpdate({email:decodedUser.email,name:decodedUser.name},{projects:[...findUser.projects,newProject._id]},{new:true,runValidators:true}).populate("projects").select("-apiKey");
        console.log(updatedUser);

        console.log("all ok");
        return NextResponse.json({ok:true,updatedUser});
    }catch(err){
        console.log(err);
    }
}