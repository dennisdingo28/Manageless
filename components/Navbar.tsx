import Link from "next/link"
import CustomButton from "./ui/CustomButton"

const Navbar = () => {
  return (
    <nav className="navbar relative text-white container mx-auto flex items-center justify-between py-5">
        <div className="logoContainer">
           <Link href={"/"} className="cursor-pointer"><h1 className="font-bold text-[1.5em] sm:text-[1.75em] font-poppins">Manageless</h1></Link> 
        </div>
        {/* Mobile */}
        <div className="flex flex-col gap-1 sm:hidden cursor-pointer">
            <div className="w-[25px] h-[2px] bg-white"></div>
            <div className="w-[25px] h-[2px] bg-white"></div>
        </div>
        <div className="absolute bottom-[-60px] left-0 right-0 w-full bg-darkBlack shadow-[2px_2px_50px_5px,rgba(0,0,0,.8)] sm:hidden">
            <div className="linkContainer gap-2 items-center flex justify-evenly py-2 md:flex">
                <div className="flex gap-2 justify-center">
                    <Link href={"/"} className="font-thin lowercase">Home</Link>
                    <Link href={"/docs"} className="font-thin lowercase">Docs</Link>
                    <Link href={"/docs"} className="font-thin lowercase">Pricing</Link>
                </div>
                <CustomButton text="Sign In" classes="bg-darkBlue ml-3 px-2 py-1 rounded-md font-poppins cursor-pointer"/>
            </div>
        </div>

        {/* Desktop */}
      
        <div className="hidden sm:block">
            <div className="linkContainer gap-2 items-center flex">
                <div className="flex gap-4">
                    <Link href={"/"} className="font-thin lowercase">Home</Link>
                    <Link href={"/docs"} className="font-thin lowercase">Docs</Link>
                    <Link href={"/docs"} className="font-thin lowercase">Pricing</Link>
                </div>
                <CustomButton text="Sign In" classes="bg-darkBlue ml-5 px-2 py-1 rounded-md font-poppins cursor-pointer"/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar