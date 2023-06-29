import axios from "axios";
import { ProjectContentProps } from "@/types";
import { User } from "next-auth";
import getObjectProperties from "./utils/getObjectProperties";

export default async function deleteContent(obj:ProjectContentProps,userKey: string,user: User | undefined,setContent:any){
    try{
        if(!obj || Object.keys(obj).length===0)
            throw new Error('No object was provided. Please try again later.');
        const req = await axios.post(`https://manageless.vercel.app/api/deleteProjectContent`,{apiKey:userKey,user,object:obj});
        if(req.data.ok)
        {
            const newJsonContent = getObjectProperties(req.data.updatedProject.projectContent);
            setContent((prev: any)=>{
                return {
                    ...prev,
                    selectedProjectContent:newJsonContent
                }
            });
        }
        return req;
    }catch(err){
        console.log(err);
        return {data:{msg:"Something went wrong while trying to delete your object content."}};
    }
}