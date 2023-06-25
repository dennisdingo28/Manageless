import { NextRequest, NextResponse } from "next/server";
import decodeToken from "@/lib/decodeJWT";
import { JwtPayload } from "jsonwebtoken";
import { Project } from "@/models/Project";
import { User } from "@/models/User";

export async function POST(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const data = await req.json();
       
        const projectId = params.id;
        const token = data.token;
        if(!data || Object.keys(data).length===0)
            throw new Error("Payload was empty. Please try again later.");
        if(!projectId)
            throw new Error(`Cannot edit any post with the id of ${projectId}`);
        if(!token || token.trim()==='')
            throw new Error('No token was provided. Please try again later');
        const decodedUser = await decodeToken(data.token) as JwtPayload;
        if(!decodedUser || Object.keys(decodedUser).length===0)
            throw new Error("Cannot decode the user. Please try again later.");
        const targetProject = await Project.findById({_id:projectId});

        if(targetProject.projectPassword===data.password){
            console.log(targetProject);
            const updatedTargetProject = await Project.findByIdAndUpdate({_id:projectId},{projectTitle:data.newTitle},{new:true,runValidators:true});
            console.log(updatedTargetProject);
            const updatedUser = await User.findOne({email:decodedUser.email,name:decodedUser.name}).populate("projects");
            console.log(updatedUser);
            
            return NextResponse.json({ok:true,updatedProject:updatedTargetProject,updatedUser});
        }
        throw new Error("Password doesn't match.");
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ok:false,msg:(error as Error).message});
    }
}