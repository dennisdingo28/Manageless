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
import { ProjectContentProps, ProjectProps } from "@/types"
import { useFormValidation } from "@/hooks/useFormValidation"
import JsonText from "@/components/ui/JsonText"
import Tabs from "@/components/Tabs"

const page =  () => {
    const {data:session,status} = useSession();
    const [copied,setCopied] = useState<boolean>(false);
    const [openModal,setOpenModal] = useState<boolean>(false);
    const [userKey,setUserKey] = useState<string>("");
    const [user,setUser] = useState<User>();
    const [createContent,setCreateContent] = useState<boolean>(false);
    const [validSelected,setValidSelected] = useState<boolean>(false);
    const [selectedProjectId,setSelectedProjectId] = useState<string>("");
    const [selectedProject,setSelectedProject] = useState<ProjectProps>();
    const [selectedProjectFormMessage,setSelectedProjectFormMessage] = useState<string>("");
    const [selectedProjectContent,setSelectedProjectContent] = useState<Array<ProjectContentProps> | undefined>([]);
    const [selectedProjectChildrenKey,setSelectedProjectChildrenKey] = useState<string>("");
    const [selectedProjectChildrenText,setSelectedProjectChildrenText] = useState<string>("");
    const [selectedProjectChildrenValid,setSelectedProjectChildrenValid] = useState<boolean>(true);
    const [createContentMessage,setCreateContentMessage] = useState<string>("")
    
    function clearInputs(){
      setSelectedProjectChildrenText("");
      setSelectedProjectChildrenKey("");
      setSelectedProjectChildrenValid(true);
      setCreateContent(false);
      setSelectedProjectFormMessage("");
      setValidSelected(false);
      setCreateContentMessage("");
    }
    useEffect(()=>{
      async function handleCreateContentObject(){
        try{
          const formData = {
            childrenText:selectedProjectChildrenText,
            childrenKey:selectedProjectChildrenKey,
          }
          const {validateForm} = useFormValidation();
          const validatedInputs = validateForm(formData);
          console.log(validatedInputs);
          
          if(!validatedInputs.valid){
            setSelectedProjectChildrenValid(false);
          }else{
            const req = await axios.post(`http://localhost:3000/api/addProjectContent/${selectedProjectId}`,{
              apiKey:userKey,
              token:JSON.parse(localStorage.getItem('token') || ""),
              content:selectedProjectContent,
            });
            if(!req.data.ok)
              setCreateContentMessage(req.data.msg);
          }
        }catch(err){
          console.log(err);
          setCreateContentMessage((err as Error).message);
        }finally{
          setTimeout(()=>{
            clearInputs();
          },1700);
        }
      }
    if(createContent)
        handleCreateContentObject();
    },[createContent]);
    

    useEffect(()=>{  
      async function retrieveProject(id: string){
        try{
          setSelectedProjectFormMessage("Loading...");

          const req = await axios.get(`http://localhost:3000/api/getProject/${id}`);
          setSelectedProjectFormMessage("");
          if(req.data.ok){
            setValidSelected(true);
            setSelectedProject(req.data.project);
            Object.keys(req.data.project.projectContent).map(obj=>{
              const projectContentKey = obj;
              const projectContentValue = req.data.project.projectContent[projectContentKey];
              setSelectedProjectContent(prev=>{
                if(prev)
                  return [
                    ...prev,
                    {[projectContentKey]:projectContentValue},
                  ]
                else return prev;
              })
            })
          }else{
            setValidSelected(false);
            setSelectedProjectFormMessage(req.data.msg);
            setTimeout(()=>{
              setSelectedProjectId("");

            },1700);
          }
          console.log(req);
          
        }catch(err){
          setValidSelected(false);
          setSelectedProjectFormMessage((err as Error).message);
          setTimeout(()=>{
            setSelectedProjectId("");

          },1700);
          
        }finally{
          setTimeout(()=>{
            clearInputs();
          },1700);
        }
      }
      if(selectedProjectId!==''){
        retrieveProject(selectedProjectId);
        setSelectedProjectContent([]);  
      }
    },[selectedProjectId]);

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
        setErrorMessage((err as Error).message);
      }
    }

    async function deleteContent(obj:ProjectContentProps){
      try{
        if(!obj || Object.keys(obj).length===0)
          throw new Error('No object was provided. Please try again later.');
        const req = await axios.post(`http://localhost:3000/api/deleteProjectContent`,{user,object:obj});
        if(req.data.ok){
          const newJsonContent = Object.keys(req.data.updatedProject.projectContent).map(projectKey=>{
            return {[projectKey]:req.data.updatedProject.projectContent[projectKey]}});
           setSelectedProjectContent(newJsonContent)
        }else{
          setCreateContentMessage("Something went wrong while trying to delete the content.")
        }
      }catch(err){
        setCreateContentMessage("Something went wrong while trying to delete the content.")

      }finally{
        setTimeout(()=>{
            clearInputs();
        },1500);
      }
    }

  return (
    <Auth>
         
        <Modal isOpen={openModal} setUser={setUser} apiKey={userKey} setIsOpen={setOpenModal} modalTitle="Create New Project" modalDescription={`Remaining projects: ${5-Number(user?.projects.length)}`}/>
 
        <div className="bg-[#161617] min-h-[100vh] pb-10 text-white">
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
                {user?.projects.length!<5 ? (
                  user?.projects.length!==0 && (
                    <CustomButton handleClick={()=>{setOpenModal(true)}} text="Create Project" classes="border border-darkBlue p-2 hover:border-lightBlue duration-100 hover:-translate-y-1"/>
                  )
                ):<p className="font-light text-[.95em]">You already have 5 projects. Delete one or contact the developer.</p>}
                
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
                          <ProjectCard key={`${project._id}`} setUser={setUser} deleteProject={deleteProject} setSelectedProjectId={setSelectedProjectId} projectTitle={project.projectTitle} projectId={`${project._id}`}/>
                      ))}
                  </div>
                 )
                 } 
              </section>
              <section className="mt-20">
                <div>
                  <h3 className="font-bold text-center sm:text-left text-[1.65em] tracking-wide">Selected Project</h3>
                  {selectedProjectId==="" && <p className="font-thin whitespace-nowrap mt-3">No selected project.</p>}
                </div>
                {selectedProjectId!=="" && (
                  <div>
                    {selectedProjectFormMessage!=='' && !validSelected ? (
                      <p>{selectedProjectFormMessage}</p>
                    ):(
                      <div className="bg-darkBlack p-2">
                        <div className="flex items-center justify-center gap-3">
                          <h1 className="text-center font-light text-[1.2em]">{selectedProject?.projectTitle}</h1>
                          <small className="font-bold">{createContentMessage}</small>
                        </div>
                        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-evenly">
                          
                          <div className="flex flex-col sm:flex-row items-center justify-center">
                            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center w-[100%] sm:w-fit">
                              <input value={selectedProjectChildrenKey} onChange={(e)=>setSelectedProjectChildrenKey(e.target.value)} className="outline-none font-thin bg-neutral-900 rounded-l-md p-1 text-gray-400 placeholder:text-gray-400 max-w-[100%] w-[100%]" placeholder="create child object key"/>
                              <input value={selectedProjectChildrenText} onChange={(e)=>setSelectedProjectChildrenText(e.target.value)} className="outline-none font-thin bg-neutral-900 p-1 text-gray-400 placeholder:text-gray-400 sm:border-l max-w-[100%] w-[100%]" placeholder="value"/>
                            </div>
                            
                            <CustomButton handleClick={()=>{
                              setCreateContent(true);
                              const key = selectedProjectChildrenKey;
                              const value = selectedProjectChildrenText;

                              const propExist = selectedProjectContent?.filter(project=>{
                                const objKey = Object.keys(project)[0];
                                return objKey===key;
                              })

                              if(propExist?.length!==0){
                                setCreateContentMessage(`Property ${key} already exists.`);
                                setCreateContent(false);
                                setTimeout(()=>{
                                  clearInputs();
                                },1700);
                                return;
                              }
                              setSelectedProjectContent(prev=>{
                                if(prev){
                                 
                                  if(value.trim()!==''){

                                    return [
                                      ...prev,
                                      {[key]:value},
                                    ]
                                  }
                                    
                                  return prev;
                                }
                                  
                              });
                            }} classes="bg-neutral-700 mt-3 sm:mt-0 font-medium font-montserrat rounded-r-md p-1 text-gray-300 hover:bg-neutral-800 duration-75 w-[100%] max-w-[100%] sm:w-fit" text="Add"/>
                            {!selectedProjectChildrenValid && (
                              <p className="text-lightBlue font-thin ml-3">Cannot be blank.</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex flex-col sm:flex-row  items-center justify-between mb-2">
                            <h3 className="text-left font-poppins text-[.95em] text-gray-300">Content Object Preview</h3>
                            <Tabs/>    
                          </div>
                          <div className="bg-neutral-800 w-full p-3">
                            <p>{`{`}</p>
                            {selectedProjectContent && (
                              selectedProjectContent.map((content, index) => {
                                const key = Object.keys(content)[0];
                                
                                const value = content[key];
                                return (
                                  <div className="ml-3">
                                    <JsonText key={index} keyText={key} value={value} handleJsonClick={deleteContent}/>
                                  </div>
                                );
                              })
                            )}
                            <p>{`}`}</p>
                          </div>
                         
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
        </div>
    </Auth>
    
  )
}

export default page