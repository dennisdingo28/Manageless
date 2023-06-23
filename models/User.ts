import { ProjectProps, UserSchemaProps } from "@/types";
import { Schema,model,models } from "mongoose";

const UserSchema = new Schema<UserSchemaProps>({
    name:{
        type:String,
        required:[true,"No name was provided"],
    },
    email:{
        type:String,
        required:[true,"No name was provided"],
    },
    image:{
        type: String,
        required:[true,"No profile image was provided"],
    },
    apiKey:{
        type: String,
        required:[true,"Cannot generate an api key. Please try again later!"]
    },
    projects:[
        
    ]
});

export const User = models.users || model<UserSchemaProps>("users",UserSchema);