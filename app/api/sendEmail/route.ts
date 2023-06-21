import { NextRequest, NextResponse } from "next/server";
import emailjs from "emailjs-com";

function getEmailJSCredentials(){
    const EMAILJS_SERVICEID=process.env.EMAILJS_SERVICEID;
    const EMAILJS_TEMPLATEID=process.env.EMAILJS_TEMPLATEID;
    const EMAILJS_PUBLICKEY=process.env.EMAILJS_PUBLICKEY;

    if(!EMAILJS_SERVICEID || !EMAILJS_TEMPLATEID || !EMAILJS_PUBLICKEY)
        throw new Error("Sending emails curently have a problem.Please try again later");

    return {EMAILJS_SERVICEID,EMAILJS_TEMPLATEID,EMAILJS_PUBLICKEY};
}

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        if(Object.keys(data).length===0 || !data)
            throw new Error("Something went wrong.Please try again later!");

        emailjs.send(getEmailJSCredentials().EMAILJS_SERVICEID,getEmailJSCredentials().EMAILJS_TEMPLATEID,{
            from_name:"dingo",
            to_name:"Dennis",
            message:"domg",
        },getEmailJSCredentials().EMAILJS_PUBLICKEY);

        return NextResponse.json({ok:true,msg:`Email was successfully sent to developer`});
    }catch(err){
        console.log(err);
    }
}