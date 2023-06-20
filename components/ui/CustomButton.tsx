
import { CustomButtonProps } from "@/types"

const CustomButton = ({text,handleClick,classes}:CustomButtonProps) => {
  return (
    <button className={classes} onClick={handleClick}>{text}</button>
  )
}

export default CustomButton