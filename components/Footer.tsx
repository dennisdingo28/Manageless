import Link from "next/link"
import { LinksArrayProps } from "@/types"
import Announce from "./ui/Announce"
import CustomButton from "./ui/CustomButton"


const Footer = ({links}:LinksArrayProps) => {
  return (
    <div className="mt-20">
        <Announce text="We get it all for free!"/>
        <div className="bg-darkBlack text-white py-4">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center">
                    <div className="mb-3">
                        <Link href={"/"}>
                         <h2 className="text-[1.65em] font-montserrat font-bold text-center">Manageless</h2>
                        </Link>
                    </div>
                    <div className="footerLinks">
                        <div className="flex flex-wrap justify-between gap-3 md:gap-11">
                            {links.map(link=>(
                                <Link key={link.text} href={link.url} className="lowercase font-light hover:text-lightBlue">{link.text}</Link>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <input type="text" placeholder="newsletter" className="bg-transparent text-[#9ca3af] outline-none border-b-2 font-thin border-darkBlue pl-1"/>
                            <CustomButton text="subscribe" classes="bg-lightBlue rounded-md px-2 py-1 font-semibold text-[.9em]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer