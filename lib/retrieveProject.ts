import axios from "axios";

export default async function retrieveProject(id: string){
    try{
        const req = await axios.get(`http://localhost:3000/api/getProject/${id}`);
        console.log(req);
        
        if(req.data.ok)
            return req;
        return req;
    }catch(err){
        return null
    }
}