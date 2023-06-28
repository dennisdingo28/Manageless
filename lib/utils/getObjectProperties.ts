import { ProjectContentProps } from "@/types";

export default function getObjectProperties(obj: ProjectContentProps): Array<ProjectContentProps>{
    const objProperties = Object.keys(obj).map(objKey=>{
        const objValue = obj[objKey];
        return {[objKey]:objValue};
    });
    return objProperties;
}