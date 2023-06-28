import { Dispatch, SetStateAction } from "react";

export default function clearInputs(setSelectedProjectProps:any,setCreateContent: Dispatch<SetStateAction<boolean>>,setCreateContentMessage:Dispatch<SetStateAction<string>>){
    setSelectedProjectProps({
        selectedProjectChildrenKey:"",
        selectedProjectChildrenValid:true,
        selectedProjectFormMessage:"",
        validSelected:false,
      });
    setCreateContent(false);
    setCreateContentMessage("");
}
/*
setSelectedProjectChildrenText("");
      setSelectedProjectChildrenKey("");
      setSelectedProjectChildrenValid(true);
      setCreateContent(false);
      setSelectedProjectFormMessage("");
      setValidSelected(false);
      setCreateContentMessage("");
*/