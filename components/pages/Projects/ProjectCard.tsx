import { ProjectCardProps } from '@/types'
import React from 'react'

const ProjectCard = ({projectTitle}:ProjectCardProps) => {
  return (
    <div>
      {projectTitle}
    </div>
  )
}

export default ProjectCard
