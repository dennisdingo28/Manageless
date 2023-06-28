import { Dispatch, SetStateAction } from "react";

export default function clearInputs(setSelectedProjectProps:any,setCreateContent: Dispatch<SetStateAction<boolean>>,setCreateContentMessage:Dispatch<SetStateAction<string>>){
    setSelectedProjectProps({
        validSelected: false,
        selectedProjectId: "",
        selectedProject:{},
        selectedProjectFormMessage:"",
        selectedProjectContent: [],
        selectedProjectChildrenKey: "",
        selectedProjectChildrenText: "",
        selectedProjectChildrenValid: false,
      });
    setCreateContent(false);
    setCreateContentMessage("");
}