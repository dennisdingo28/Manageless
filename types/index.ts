import mongoose from "mongoose";
import { User } from "next-auth";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface CustomButtonProps {
    text?: string;
    handleClick?: ()=>void;
    classes?: string;
    disabled?: boolean;
}
export interface CricleProps {
    circleWidth: number;
    circleHeight: number;
    color?: string;
    outline?: boolean;
}
export interface LinkProps {
    text: string;
    url: string;
}
export interface TextBoxProps {
    title: string;
    text?: string;
    links?: Array<LinkProps>;
}
export interface AuthorProps {
    authorName: string;
    authorDescription?: string;
    authorEmail: string;
    authorRole?: string;
    authorGithub?: string;
    authorDiscord?: string;
}
export interface AnnounceProps {
    text: string;
}
export interface LinksArrayProps {
    links:Array<LinkProps>;
}
export interface FormDataProps {
    name?: string;
    email?: string;
    description?: string;
    password?: string;
    title?: string;
    childrenText?: string;
    childrenKey?: string;
    parentText?: string;
}
export interface ProjectProps{
    _id: mongoose.ObjectId;
}
export interface UserSchemaProps {
    name: string;
    email: string;
    image: string;
    token: string;
    apiKey: string;
    projects: Array<ProjectProps>
}
export interface SessionUserProps{
    name: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
}
export interface SessionUser {
    user: {
        name: string;
        email: string;
        image: string;
        token: string;
        _id: string;
    },
    expires: Date;
}
export interface InfoCardProps {
    cardTitle: string;
    cardBody?: ReactNode;
    cardFooter?: ReactNode;
}
export interface ModalProps {
    modalTitle: string;
    modalDescription: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    projectTitle?: string;
    projectId?: string;
    apiKey?: string;
    setUser?: Dispatch<SetStateAction<User | undefined>>;
}
export interface InputProps {
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>> | undefined;
    inputPlaceholder?: string;
    type?: string;
    isDisabled: boolean;
}
export interface ProjectProps {
    projectTitle: string;
    projectPassword: string;
    projectContent: any;
}
export interface ProjectCardProps{
    projectTitle: string;
    projectId: string;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    deleteProject: (id: string,setErrorMessage:Dispatch<SetStateAction<string>>)=>void;
    setSelectedProjectId: Dispatch<SetStateAction<string>>;
}
export interface ProjectContentProps {
    [key: string]: string;
}
export interface JsonTextProps {
    keyText: string;
    value: string;
    index?: number;
    handleJsonClick?: (obj: ProjectContentProps)=>void;
}