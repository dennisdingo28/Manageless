"use client";

import Image from "next/image"
import Link from "next/link"
import { AuthorProps } from "@/types"
import CustomButton from "./CustomButton"
import { useState } from "react";

const Author = ({authorName,authorDescription,authorRole,authorGithub,authorDiscord}:AuthorProps) => {

    const [toggleContact,setToggleContact] = useState<boolean>(false);

  return (
    <div className="bg-lightBlue rounded-sm px-2 py-1 text-white ">
        <div className="authorHeader">
            <h2 className="uppercase font-bold text-[1.75em] text-center">DEVELOPER</h2>
        </div>
        <div className="authorBody flex flex-col lg:flex-row lg:items-center">
            <div className="lg:flex-1">
                <div className="flex items-center justify-between lg:justify-normal lg:gap-2">
                    <div className="flex items-center gap-2">
                        <Image src="https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" width={75} height={75} className="w-[50px] h-[50px] rounded-full object-cover" alt="profile image"/>
                        <h3 className="font-thin">{authorName} {authorRole && <span>- {authorRole}</span>}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link target="_blank" href={"https://github.com/dennisdingo28"} className="hover:-translate-y-[3px] duration-100">
                            <i className="bi bi-github cursor-pointer text-[1.2em] text-[#010409] "></i>
                        </Link>
                        <Link href={"/"} className="hover:-translate-y-[3px] duration-100">
                            <i className="bi bi-discord cursor-pointer text-[1.2em] text-[#010409]"></i>
                        </Link>
                    </div>   
                </div>
                <div className="">
                    <p className="font-extralight">{authorDescription || ""}</p>
                </div>
            </div>
            
           <div className="lg:flex-1 flex flex-col">
            <div className="self-center mt-2">
                <CustomButton text="contact me" handleClick={()=>setToggleContact(prev=>!prev)} classes="bg-white text-darkBlue font-medium text-[1.1em] rounded-lg p-1 border-2 border-white hover:text-white hover:bg-transparent duration-75"/>
            </div>
            <div className={`contactAuthor duration-100 opacity-0 h-0 mt-6 -z-10 pointer-events-none ${toggleContact && "opacity-100 z-0 h-[200px] pointer-events-auto"}`}>
                <div className="flex flex-col gap-5">
                    <div className="userDetails flex flex-col items-center justify-center sm:flex-row gap-5">
                        <input type="text" placeholder="name" className=" bg-transparent w-full border-b outline-none pl-1 text-gray-300 placeholder:text-gray-200 font-extralight"/>
                        <input type="text" placeholder="email" className="bg-transparent w-full border-b outline-none pl-1 text-gray-300 placeholder:text-gray-200 font-extralight"/>
                    </div>
                    <div className="flex justify-center items-center">
                        <textarea className="w-full max-w-[550px]  resize-none bg-transparent border-x pl-2 text-gray-300 outline-none font-extralight placeholder:text-gray-200" placeholder="description"></textarea>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <div className="cursor-pointer flex items-center justify-center gap-1">
                        <CustomButton text="send"/>
                        <i className="bi bi-send"></i>
                    </div>
                </div>
            </div>
           </div>
        </div>
    </div>  
  )
}

export default Author