import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { ProjectContentProps, ProjectProps } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        const apiKey = data.apiKey;
        const objToDelete = data.object;
        if(!data || Object.keys(data).length===0)
            throw new Error('Empty data was provided. Please try again later.');
        if(!apiKey || apiKey.trim()==='')
            throw new Error('No api key provided. Please try again later.');
        if(!objToDelete || Object.keys(objToDelete).length===0)
            throw new Error('No object to delete was provided. Please try again later.');
        
        const user = await User.findOne({_id:data.user._id,email:data.user.email,name:data.user.name,apiKey:apiKey}).populate('projects','projectTitle projectContent',Project);

        if(!user)
            throw new Error('Cannot find any users with provided credintials. Please try again later.');
            let userContainsProject: boolean = false;
            let projectObj: ProjectProps = {} as ProjectProps;
            user.projects.forEach((project: ProjectProps)=>{
            Object.keys(project.projectContent).forEach(keyText=>{
                const constructedObject = {[keyText]:project.projectContent[keyText]};
                console.log('constructed',constructedObject);
                if(constructedObject[keyText]===objToDelete[keyText] && keyText===Object.keys(objToDelete)[0])
                {
                    userContainsProject=true;
                    projectObj =project; 
                }
            })
        })
        if(userContainsProject){
            const updatedProjectContent: ProjectContentProps = {};
             Object.keys(projectObj.projectContent).forEach(projectKey=>{
                const value = projectObj.projectContent[projectKey];
                if(projectKey!==Object.keys(objToDelete)[0] && value!==objToDelete[Object.keys(objToDelete)[0]])
                    updatedProjectContent[projectKey]=value;
            })
            
            const updatedProject = await Project.findOneAndUpdate({_id:projectObj._id,projectTitle:projectObj.projectTitle},{projectContent:updatedProjectContent},{new:true,runValidators:true}).select('-projectPassword');
            if(!updatedProject)
                throw new Error('Cannot find any project that met the request credintials. Please try again later.');
            const updatedUser = await User.findOne({_id:data.user._id,email:data.user.email,name:data.user.name,apiKey:apiKey}).populate('projects','projectTitle projectContent',Project);
            return NextResponse.json({ok:true,updatedProject,updatedUser})
        }else{
            throw new Error('Cannot find the user with provided credintials that met the requirements. Please try again later.')
        }
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return NextResponse.json({ok:false,msg:"Something went wrong while trying to access you account. Please try again later."});
        return NextResponse.json({ok:false,msg:(err as Error).message});
    }
}