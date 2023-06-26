import { NextRequest } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id: string}}){
    try{
        const data = await req.json();
        console.log(data,params.id);
        
    }catch(err){
        console.log(err);
    }
}