"use client"

import { MouseEvent } from 'react';
import { ProjectCardProps } from '@/types'
import React from 'react'
import { useState } from 'react';
import EditModal from './EditModal';


const ProjectCard = ({projectTitle,setUser,projectId,deleteProject,setSelectedProjectId}:ProjectCardProps) => {
  const [projectErrorMessage,setProjectErrorMessage] = useState<string>("");
  const [isOpen,setIsOpen] = useState<boolean>(false);

  return (
    <div className="" onClick={()=>setSelectedProjectId(projectId)}>
      <EditModal modalTitle='Edit your project' modalDescription='Change your project title' setUser={setUser} projectTitle={projectTitle} projectId={`${projectId}`} isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className='bg-[#1e1e1e] p-4 rounded-md cursor-pointer'>
        <p className='font-[.9em] font-gray-200 font-medium text-center'>Project name: <span className="font-thin tracking-wide">{projectTitle}</span></p>
          <div className='flex items-center justify-center gap-2 mt-2'>
            <i onClick={(e:MouseEvent<HTMLButtonElement>)=>{
              e.stopPropagation();
              setIsOpen(true)}} className="bi bi-pencil-square cursor-pointer hover:text-gray-400 duration-75"></i>
            <i onClick={async (e:MouseEvent<HTMLButtonElement>)=>{
              e.stopPropagation();
              setProjectErrorMessage("Loading...");
              await deleteProject(`${projectId}`,setProjectErrorMessage)
              
              setTimeout(() => {
                setProjectErrorMessage("");

              }, 2000);
            
            }} className="bi bi-trash3 cursor-pointer hover:text-gray-400 duration-75"></i>
          </div>
        <p className='text-center whitespace-wrap font-extralight'>{projectErrorMessage}</p>
      </div>
    </div>
    
  )
}

export default ProjectCard;
