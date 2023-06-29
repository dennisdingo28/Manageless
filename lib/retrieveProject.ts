import axios from "axios";

export default async function retrieveProject(id: string){
    try{
        const req = await axios.get(`http://localhost:3000/api/getProject/${id}`);
        console.log(req);
        
        return req;
    }catch(err){
        console.log(err);
        
        return {data:{ok:false,msg:"Something went wrong while trying to access your project. Please try again later."}}
    }
}