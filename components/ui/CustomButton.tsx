
import { CustomButtonProps } from "@/types"

const CustomButton = ({text,handleClick,classes,disabled}:CustomButtonProps) => {
  return (
    <button className={classes} onClick={handleClick} disabled={disabled}>{text}</button>
  )
}

export default CustomButton