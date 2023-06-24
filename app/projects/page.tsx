"use client"

import Auth from "@/components/hoc/Auth"
import InfoCard from "@/components/pages/Projects/InfoCard"
import CustomButton from "@/components/ui/CustomButton"
import Modal from "@/components/ui/Modal"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const page =  () => {
    const {data:session,status} = useSession();
    const [userKey,setUserKey] = useState<string>("");
    const [copied,setCopied] = useState<boolean>(false);
    const [openModal,setOpenModal] = useState<boolean>(false);
 
    

    useEffect(()=>{
      async function getUserApiKey(){
        if(status==="authenticated"){
          const user = await axios.get(`http://localhost:3000/api/getUser/${session?.user?._id}`);
          console.log(user);
          
          if(user.data.ok){
            setUserKey(user.data.user.apiKey);
          }
        }
      }
      getUserApiKey();
    },[status]);
    
    async function handleCopy(){
      const clipboardText = await navigator.clipboard.readText();
      console.log(clipboardText);
      if(clipboardText!==`${userKey}`){
        await navigator.clipboard.writeText(`${userKey}`);
      }
      setCopied(true);
      setTimeout(()=>{
        setCopied(false);
      },2000);
    }

  return (
    <Auth>
         
        <Modal isOpen={openModal} apiKey={userKey} setIsOpen={setOpenModal} modalTitle="Create New Project" modalDescription={`Remaining projects: ${5-Number(session?.user?.projects.length)}`}/>
 
        <div className="bg-[#161617] min-h-[100vh] text-white">
            <div className="sm:container sm:mx-auto">
              <div className="dashboardHeader flex flex-col md:flex-row pt-6 gap-4">
                <InfoCard cardTitle="API Key" cardBody={
                  <div className="my-3">
                    <div className="flex items-center justify-center">
                      <div className="flex bg-[#161617]">
                        <p className="p-1 text-slate-500">{userKey}</p>
                        <div className="bg-slate-800 p-1 rounded-r-md">
                          {!copied ? (
                            <i className="bi bi-clipboard cursor-pointer" onClick={handleCopy}></i>
                          ):(
                            <i className="bi bi-clipboard2-check"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                } cardFooter={<small className="text-gray-400">make sure you do not share the key with anyone</small>}/>
                <InfoCard cardTitle="Current Projects" cardBody={<p>test body</p>} cardFooter={<p>test footer</p>}/>
                <InfoCard cardTitle="Manageless api usage" cardBody={<p>status:medium</p>} cardFooter={<p className="text-green-600">online</p>}/>
              </div>
            </div>
            <div className="container mx-auto mt-10">
              <h3 className="font-bold text-left text-[1.65em] tracking-wide">Projects</h3>
              <section>
                {session?.user?.projects.length===0 ? (
                  <div className="flex items-center gap-1">
                    <p className="font-thin whitespace-nowrap">No current projects.</p>
                    <CustomButton handleClick={()=>{setOpenModal(true)}} text="Create Project" classes="bg-darktBlue px-2 py-1 font-medium whitespace-nowrap cursor-pointer hover:text-darkBlue hover:-translate-y-1 duration-100"/>
                  </div>
                ):(
                  <p>your projects</p>
                )}
              </section>
            </div>
        </div>
    </Auth>
    
  )
}

export default page