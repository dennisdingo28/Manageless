import {DefaultSession} from "next-auth";
import { ProjectProps } from "./types";

declare module "next-auth"{
    interface User {
        id?,
        _id:string;
        token: string;
        apiKey: string;
        projects: Array<ProjectProps>
    }
    interface Session extends DefaultSession {
        user?: User;
    }
}