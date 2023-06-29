import { Dispatch, SetStateAction } from "react";

export default function clearInputs(setSelectedProjectProps:any,setCreateContent: Dispatch<SetStateAction<boolean>>,setCreateContentMessage:Dispatch<SetStateAction<string>>){
    setSelectedProjectProps((prev:any)=>{
        return {
          ...prev,
          selectedProjectChildrenText:"",
          selectedProjectChildrenKey:"",
          selectedProjectChildrenValid:true,
          selectedProjectFormMessage:"",
          validSelected:false,
        }
      
      });
    setCreateContent(false);
    setCreateContentMessage("");
}