import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { ProjectContentProps, ProjectProps } from "@/types";
import { NextRequest } from "next/server";

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
            console.log(projectObj);
            const updatedProjectContent: ProjectContentProps = {

            }
             Object.keys(projectObj.projectContent).forEach(projectKey=>{
                const value = projectObj.projectContent[projectKey];
                if(projectKey!==Object.keys(objToDelete)[0] && value!==objToDelete[Object.keys(objToDelete)[0]])
                    updatedProjectContent[projectKey]=value;
            })
            
            const updatedProject = await Project.findOneAndUpdate({_id:projectObj._id,projectTitle:projectObj.projectTitle},{projectContent:updatedProjectContent});
        }
    }catch(err){
        console.log(err);
    }
}