import { Dispatch, SetStateAction } from "react";
import mongoose from "mongoose";
import axios from "axios";
import { User } from "next-auth";
import { ProjectProps } from "@/types";
import { ProjectContentProps } from "@/types";

export default async function deleteProject(id: string,userKey: string,user: User,setUser: Dispatch<SetStateAction<User | undefined>>,setSelectedProjectProps: Dispatch<SetStateAction<any>>,setErrorMessage: Dispatch<SetStateAction<string>>){
      try{
        if(!id || !mongoose.Types.ObjectId.isValid(id))
          throw new Error(`ID ${id} is not a valid id. Please try again later.`);
        const req = await axios.post(`https://manageless.vercel.app/api/deleteProject/${id}`,{apiKey:userKey,user});
        
        if(req.data.ok){
          setSelectedProjectProps((prev:any)=>{
            return{
              validSelected: false as boolean,
              selectedProjectId: "" as string,
              selectedProject:{} as ProjectProps,
              selectedProjectFormMessage:"" as string,
              selectedProjectContent: [] as Array<ProjectContentProps>,
              selectedProjectChildrenKey: "" as string,
              selectedProjectChildrenText: "" as string,
              selectedProjectChildrenValid: false,
            }
          })
          return setUser(req.data.updatedUser);
        }
        setErrorMessage(req.data.msg);
      }catch(err){
        setErrorMessage((err as Error).message);
      }
}