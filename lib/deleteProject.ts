import { Dispatch, SetStateAction } from "react";
import mongoose from "mongoose";
import axios from "axios";
import { User } from "next-auth";

export default async function deleteProject(id: string,userKey: string,user: User,setUser: Dispatch<SetStateAction<User | undefined>>,setErrorMessage: Dispatch<SetStateAction<string>>){
      try{
        if(!id || !mongoose.Types.ObjectId.isValid(id))
          throw new Error(`ID ${id} is not a valid id. Please try again later.`);
        const req = await axios.post(`http://localhost:3000/api/deleteProject/${id}`,{apiKey:userKey,user});
        
        if(req.data.ok){
          return setUser(req.data.updatedUser);
        }
        setErrorMessage(req.data.msg);
      }catch(err){
        setErrorMessage((err as Error).message);
      }
}