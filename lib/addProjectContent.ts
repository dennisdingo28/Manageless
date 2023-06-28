import { ProjectContentProps } from "@/types";
import axios from "axios";

export default async function createContentObject(projectId: string,userKey: string,selectedProjectContent: Array<ProjectContentProps> | undefined){
    try{
        const req = await axios.post(`http://localhost:3000/api/addProjectContent/${projectId}`,{
            apiKey:userKey,
            token:JSON.parse(localStorage.getItem('token') || ""),
            content:selectedProjectContent,
        });
        return req;
    }catch(err){
        return {data:{msg:"Something went wrong while trying to access add the content. Please try again later."}};
    }
}