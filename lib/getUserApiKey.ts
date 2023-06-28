import axios from "axios";

export default async function getUserApiKey(userId: string){
    try{        
        const target = await axios.get(`http://localhost:3000/api/getUser/${userId}`);
        
        if(target.data.ok){
            return target.data;
        }
        return null;
    }catch(err){
        return null;
    }    
}