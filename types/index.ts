export interface CustomButtonProps {
    text?: string;
    handleClick?: ()=>void;
    classes?: string;
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