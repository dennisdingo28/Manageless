import { ProjectCardProps } from '@/types'
import React from 'react'

const ProjectCard = ({projectTitle,projectId,projectErrorMessage,deleteProject}:ProjectCardProps) => {
  return (
    <div className='bg-[#1e1e1e] p-4 rounded-md cursor-pointer'>
      <p className='font-[.9em] font-gray-200 font-medium text-center'>Project name: <span className="font-thin tracking-wide">{projectTitle}</span></p>
      <div className='flex items-center justify-center gap-2 mt-2'>
        <i className="bi bi-pencil-square cursor-pointer hover:text-gray-400 duration-75"></i>
        <i onClick={()=>deleteProject(`${projectId}`)} className="bi bi-trash3 cursor-pointer hover:text-gray-400 duration-75"></i>
      </div>
      <p className='text-center whitespace-wrap font-extralight'>{projectErrorMessage}</p>
    </div>
  )
}

export default ProjectCard;
