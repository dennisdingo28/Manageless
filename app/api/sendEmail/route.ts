import { NextRequest,NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        console.log(data);
        if(Object.keys(data).length===0 || !data)
            throw new Error("Data for sending the email was found empty.Please fill in the inputs.");
        
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD,
            },
        });

        const mailOptions = {
            from:process.env.NODEMAILER_EMAIL,
            to:process.env.NODEMAILER_EMAIL,
            subject:`New message from ${data.name} - ${data.email}`,
            html:`<h1>${data.description}</h1>`
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ok:true,msg:"Email was successfully sent to the developer !"});

    }catch(err){
        console.log(err);
        
    }
}