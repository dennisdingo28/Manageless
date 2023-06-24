import jwt from "jsonwebtoken";

export default async function decodeToken(token:string){
    const decodedUser = jwt.decode(token);
    return decodedUser;
}