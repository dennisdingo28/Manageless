import axios from "axios";
import { ProjectContentProps } from "@/types";
import { User } from "next-auth";
import getObjectProperties from "./utils/getObjectProperties";
import { Dispatch, SetStateAction } from "react";

export default async function deleteContent(obj:ProjectContentProps,userKey: string,user: User | undefined,setContent:any){
    try{
        if(!obj || Object.keys(obj).length===0)
            throw new Error('No object was provided. Please try again later.');
        const req = await axios.post(`http://localhost:3000/api/deleteProjectContent`,{apiKey:userKey,user,object:obj});
        if(req.data.ok)
        {
            const newJsonContent = getObjectProperties(req.data.updatedProject.projectContent);
            setContent(newJsonContent);
        }
        return req;
    }catch(err){
        console.log(err);
        return {data:{msg:"Something went wrong while trying to delete your object content."}};
    }
}