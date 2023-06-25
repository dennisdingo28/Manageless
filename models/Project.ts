import { Schema,model,models } from "mongoose";
import { ProjectProps } from "@/types";

const ProjectSchema = new Schema<ProjectProps>({
    projectTitle:{
        type: String,
        required:[true,"You must provide a project title"],
    },
    projectPassword:{
        type: String,
        required:[true,"You must provide a password."],
    }
})

export const Project = models.project || model<ProjectProps>("project",ProjectSchema);