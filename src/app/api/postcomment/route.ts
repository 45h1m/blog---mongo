import { postComment } from "@/_actions/blogActions";
import { saveLog } from "@/lib/logger";
import rateLimited from "@/rateLimiter";
import { NextRequest, NextResponse, } from "next/server";

export async function POST(req: NextRequest) {
    try {
        saveLog(req);

        
        const email = req.headers.get("u-email");
        const name = req.headers.get("u-name");
        const dp = req.headers.get("u-dp");

        
        if(rateLimited(`${email}-postComment`, 1000 * 30)) {

            return NextResponse.json({ error: "Too many request !!" }, {status: 429});
        }

        const { blogID, content }: any = await req.json();
    
        if (!content || !blogID) return NextResponse.json({ error: "Comment posting failed: Provide text and blogID." });
    
    
        const updatedComments = await postComment({ name: name!, email: email!, dp: dp!, content }, blogID);
    
        if (updatedComments) return NextResponse.json({ data: "Comment posted" });
        else return NextResponse.json({ error: "Comment posting failed: " });


    } catch (error) {
        console.log("error posting comment: "+ error);
        return NextResponse.json({ error: "Comment posting failed." });
    }
}
