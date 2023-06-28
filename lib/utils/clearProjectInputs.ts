import { Dispatch, SetStateAction } from "react";

export default function clearInputs(setSelectedProjectChildrenText: Dispatch<SetStateAction<string>>,setSelectedProjectChildrenKey: Dispatch<SetStateAction<string>>, setSelectedProjectChildrenValid: Dispatch<SetStateAction<boolean>>, setCreateContent: Dispatch<SetStateAction<boolean>>, setValidSelected: Dispatch<SetStateAction<boolean>>,setSelectedProjectFormMessage: Dispatch<SetStateAction<string>>, setCreateContentMessage:Dispatch<SetStateAction<string>>){
    setSelectedProjectChildrenText("");
    setSelectedProjectChildrenKey("");
    setSelectedProjectChildrenValid(true);
    setCreateContent(false);
    setSelectedProjectFormMessage("");
    setValidSelected(false);
    setCreateContentMessage("");
}