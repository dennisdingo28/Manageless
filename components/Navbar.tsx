"use client";

import Link from "next/link";
import CustomButton from "./ui/CustomButton";
import { useState } from "react";
import {signIn,useSession} from "next-auth/react";

const Navbar = () => {
    const [toggleMenu,setToggleMenu] = useState<boolean>(false);
    const {data: session,status} = useSession();
    
  return (
    <nav className="navbar text-white container mx-auto py-5">
        {/* Mobile */}
        <div className="sm:hidden">
            <div className="flex items-center justify-between">
                <div className="logoContainer">
                    <Link href={"/"} className="cursor-pointer"><h1 className="font-bold text-[30px] sm:text-[1.75em] md:text-[2em] font-poppins">Manageless</h1></Link> 
                </div>
                <div className="flex flex-col gap-1 sm:hidden cursor-pointer" onClick={()=>setToggleMenu(!toggleMenu)}>
                    <div className={`w-[25px] h-[2.3px] bg-white line line1 ${toggleMenu && "activeLine"}`}></div>
                    <div className={`w-[25px] h-[2.3px] bg-white line line2 ${toggleMenu && "activeLine"}`}></div>
                </div>
            </div>
            
            <div className={`w-full duration-100 ${toggleMenu ? "h-[4.5em] opacity-100 z-0 pointer-events-auto":"h-0 opacity-0 -z-10 pointer-events-none"} sm:hidden mt-1`}>
                <div className="linkContainer gap-3 flex items-center flex-col justify-center">
                    <div className="flex gap-6 justify-center items-center">
                        <Link href={"/"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Home</Link>
                        <Link href={"/docs"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Docs</Link>
                        <Link href={"/projects"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Projects</Link>
                    </div>
                    <CustomButton text="Sign In" handleClick={()=>{signIn("google")}} classes="bg-darkBlue ml-5 px-2 py-1 rounded-md font-poppins cursor-pointer hover:bg-lightBlue"/>
                </div>
            </div>
        </div>        
              
        {/* Desktop */}
        <div className="hidden sm:flex sm:justify-between">
            <Link href={"/"} className="cursor-pointer"><h1 className="font-bold text-[30px] sm:text-[1.75em] md:text-[2em] font-poppins">Manageless</h1></Link> 

            <div className="linkContainer gap-2 items-center flex">
                <div className="flex gap-4">
                    <Link href={"/"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Home</Link>
                    <Link href={"/docs"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Docs</Link>
                    <Link href={"/projects"} className="font-thin lowercase hover:text-lightBlue text-[1.2em] duration-75">Projects</Link>
                </div>
                <CustomButton text="Sign In" handleClick={()=>{signIn("google")}} classes="bg-darkBlue ml-5 px-2 py-1 rounded-md font-poppins cursor-pointer hover:bg-lightBlue"/>
            </div>
        </div>

    </nav>
  )
}

export default Navbar