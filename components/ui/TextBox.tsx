import { link } from "fs"
import Circle from "./Circle"
import { TextBoxProps } from "@/types"
import Link from "next/link"

const TextBox = ({title,text,links}:TextBoxProps) => {
  return (
    <div>
        <h4 className="flex items-center gap-2 text-[1.3em] font-medium">
            <Circle circleWidth={8} circleHeight={8} color="darkBlue"/>
            {title}
        </h4>
        <p className="ml-2 text-[1.1em]">{text}</p>
        <div className="flex items-center justify-center gap-4 mt-2">
            {links && links.map(link=>(
                <Link href={link.url} className="text-lightBlue font-montserrat font-semibold relative after:content-[''] after:absolute after:-bottom-[1px] after:h-[2px] after:w-[0px] after:bg-darkBlue after:left-[50%] after:-translate-x-[50%] hover:after:w-[100%] duration-100 after:duration-100">{link.text}</Link>
            ))}
        </div>
        
    </div>
  )
}

export default TextBox
