import { SessionUserProps } from "@/types"
import Image from "next/image"

const UserProfile = ({name,email,image}:SessionUserProps) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
        <div>
            <Image src={`${image}`} width={24} height={24} className="w-[33px] h-[33px] rounded-full" alt="profile picture"/>
        </div>
        <div className="">
            <p>{name}</p>
        </div>
    </div>
  )
}

export default UserProfile