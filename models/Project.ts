import { Schema,model,models } from "mongoose";
import { ProjectProps } from "@/types";
import bcrypt from "bcrypt";

const ProjectSchema = new Schema<ProjectProps>({
    projectTitle: {
      type: String,
      required: [true, "You must provide a project title"],
    },
    projectPassword: {
      type: String,
      required: [true, "You must provide a password."],
    },
    projectContent: {
      type: Object,
      default: {},
    },
},{minimize:false});


ProjectSchema.methods.comparePassword = async function (password: string){
  try{
    const match = await bcrypt.compare(password,this.projectPassword);
    return match;
  }catch(err){
      console.log(err);
      return false;
  }
}
ProjectSchema.pre('save',async function(){
  try{  
        const salt = await bcrypt.genSalt(10);
        if(this.projectPassword){
            const hashedPassword = await bcrypt.hash(this.projectPassword,salt);
            this.projectPassword=hashedPassword;
        }else{
            throw new Error("Password is empty");
        }
    }catch(err){
        console.log(err);
    }
})

export const Project = models.project || model<ProjectProps>("project",ProjectSchema);