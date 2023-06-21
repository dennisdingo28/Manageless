import { AnnounceProps } from "@/types"

const Announce = ({text}:AnnounceProps) => {
  return (
    <div className="bg-[#fd7b3b] w-fit px-2 py-1 rounded-t-sm">
        <div className="font-bold">Announcement !</div>
        <p className="font-light text-gray-100">{text}</p>
    </div>
  )
}

export default Announce