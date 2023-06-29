import axios from "axios";

export default async function retrieveProject(id: string){
    try{
        const req = await axios.get(`https://manageless.vercel.app/api/getProject/${id}`);
        console.log(req);
        
        return req;
    }catch(err){
        console.log(err);
        
        return {data:{ok:false,msg:"Something went wrong while trying to access your project. Please try again later."}}
    }
}