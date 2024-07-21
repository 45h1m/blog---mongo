import { getComments } from "@/_actions/blogActions";
import { saveLog } from "@/lib/logger";
import rateLimited from "@/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    saveLog(req);

    const { blogID }: any = await req.json();

    if(!blogID) return NextResponse.json({ error: "Provide blogID." })

    const comments = await getComments(blogID);

    if(comments)
        return NextResponse.json(comments);
    
    return NextResponse.json({error: "Something went wrong"});
}
