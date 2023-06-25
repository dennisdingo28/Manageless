"use client"

import Auth from "@/components/hoc/Auth"
import InfoCard from "@/components/pages/Projects/InfoCard"
import CustomButton from "@/components/ui/CustomButton"
import Modal from "@/components/ui/Modal"
import axios from "axios"
import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { User } from "next-auth"
import ProjectCard from "@/components/pages/Projects/ProjectCard"
import mongoose from "mongoose"

const page =  () => {
    const {data:session,status} = useSession();
    const [copied,setCopied] = useState<boolean>(false);
    const [openModal,setOpenModal] = useState<boolean>(false);
    const [userKey,setUserKey] = useState<string>("");
    const [user,setUser] = useState<User>();
    

    useEffect(()=>{
      async function getUserApiKey(){
        if(status==="authenticated"){
          const user = await axios.get(`http://localhost:3000/api/getUser/${session?.user?._id}`);
          
          if(user.data.ok){
            setUserKey(user.data.user.apiKey);
            setUser(user.data.user);
          }
        }
      }
      getUserApiKey();
    },[status]);
    
    async function handleCopy(){
      const clipboardText = await navigator.clipboard.readText();
      if(clipboardText!==`${user?.apiKey}`){
        await navigator.clipboard.writeText(`${user?.apiKey}`);
      }
      setCopied(true);
      setTimeout(()=>{
        setCopied(false);
      },2000);
    }

    async function deleteProject(id: string,setErrorMessage: Dispatch<SetStateAction<string>>){
      try{
        if(!id || !mongoose.Types.ObjectId.isValid(id))
          throw new Error(`ID ${id} is not a valid id. Please try again later.`);
        const req = await axios.post(`http://localhost:3000/api/deleteProject/${id}`,{apiKey:userKey,user});
        if(req.data.ok){
          return setUser(req.data.updatedUser);
        }
        setErrorMessage(req.data.msg);
      }catch(err){
        console.log(err);
        setErrorMessage((err as Error).message);
      }
    }

  return (
    <Auth>
         
        <Modal isOpen={openModal} setUser={setUser} apiKey={userKey} setIsOpen={setOpenModal} modalTitle="Create New Project" modalDescription={`Remaining projects: ${5-Number(user?.projects.length)}`}/>
 
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
                <InfoCard cardTitle="Current Projects" cardBody={
                <div className="my-3">
                  <p className="text-center text-slate-500 p-1">You got {user?.projects.length} / 5 projects</p>
                  </div>} cardFooter={<small className="text-gray-400">We give premium content for free</small>}/>
                <InfoCard cardTitle="Manageless api usage" cardBody={<p>status:medium</p>} cardFooter={<p className="text-green-600">online</p>}/>
              </div>
            </div>
            <div className="container mx-auto mt-10">
              <div className={`${user?.projects.length!==0 && "flex items-center justify-between"}`}>
                <h3 className="font-bold text-left text-[1.65em] tracking-wide">Projects</h3>
                {user?.projects.length!==0 && (
                    <CustomButton handleClick={()=>{setOpenModal(true)}} text="Create Project" classes="border border-darkBlue p-2 hover:border-lightBlue duration-100 hover:-translate-y-1"/>
                )}
              </div>
              <section>
                { user?.projects.length===0 ? ( 
                  <div className="flex items-center gap-1">
                    <p className="font-thin whitespace-nowrap">No current projects.</p>
                    <CustomButton handleClick={()=>{setOpenModal(true)}} text="Create Project" classes="bg-darktBlue px-2 py-1 font-medium whitespace-nowrap cursor-pointer hover:text-darkBlue hover:-translate-y-1 duration-100"/>
                  </div>
                 ):(
                  <div className="flex flex-col flex-wrap gap-4 mt-6 md:flex-row">
                      {user?.projects.map(project=>(
                          <ProjectCard key={`${project._id}`} setUser={setUser} deleteProject={deleteProject} projectTitle={project.projectTitle} projectId={`${project._id}`}/>
                      ))}
                  </div>
                 )
                 } 
              </section>
            </div>
        </div>
    </Auth>
    
  )
}

export default page