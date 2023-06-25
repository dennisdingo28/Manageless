import { FormDataProps } from "@/types"
import { useState } from "react"

function validateForm(formData:FormDataProps){

    const newErrors : FormDataProps = {};

    function addNewError(property: keyof FormDataProps,msg: string){
        newErrors[property] = msg;
    }

    if(formData.name || formData.name?.length===0){

        const empty= checkEmpty(formData.name);
        
        if(empty)
            addNewError("name","Username is blank");
    }
    if(formData.title || formData.title?.length===0){

        const empty= checkEmpty(formData.title);
        
        if(empty)
            addNewError("title","Title is blank");
    }

    if(formData.email || formData.email?.length===0){
        const empty = checkEmpty(formData.email);

        if(empty)
            addNewError("email","Email is blank");
        else{
            if(!isValidEmail(formData.email)){
                addNewError("email","Email is not valid")
            }
        }
    }

    if(formData.password || formData.password?.length===0){

        const empty= checkEmpty(formData.password);
        
        if(empty)
            addNewError("password","Password is blank");
    }

    if(formData.description || formData.description?.length===0){
        const empty = checkEmpty(formData.description);

        if(empty)
            addNewError("description","Description is blank");
    }
  
    if(Object.keys(newErrors).length!==0){
        return {valid:false,errors:newErrors};
    }
    return {valid:true,formData};

}
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function checkEmpty(value: string): boolean{
    if(value.trim()==='')
        return true;
    return false;
}


export const useFormValidation = () =>{
    return {validateForm,isValidEmail,checkEmpty};   
}