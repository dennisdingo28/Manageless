import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{api_key:string, project_title: string}}){
    return NextResponse.json({ok:false,msg:"Credintials missing. Please provide your api key and project's title you want to retrieve. Read more on our docs."});
}