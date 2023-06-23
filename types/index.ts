import mongoose from "mongoose";

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
}
export interface ProjectProps{
    _id: mongoose.ObjectId;
}
export interface UserSchemaProps {
    name: string;
    email: string;
    image: string;
    token: string;
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