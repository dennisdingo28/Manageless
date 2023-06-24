import { InputProps } from "@/types"
import { type } from "os"

const Input = ({inputValue,isDisabled,setInputValue,type,inputPlaceholder}:InputProps) => {
  return (
    <div>
        <input className={`w-full bg-transparent border-b font-thin outline-none p-1 duration-100 focus:border-darkBlue text-gray-100 placeholder:font-thin ${isDisabled && "text-gray-300 border-none"}`} readOnly={isDisabled} type={type || "text"} value={inputValue} onChange={(e)=>{
          if(setInputValue)
            setInputValue(e.target.value)
  }} placeholder={inputPlaceholder || ""}/>
    </div>
  )
}

export default Input