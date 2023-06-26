import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        console.log(data);
        
    }catch(err){
        console.log(err);
    }
}