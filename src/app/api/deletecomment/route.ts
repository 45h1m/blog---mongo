import { NextRequest, NextResponse } from "next/server";
import { BlogModel } from "@/schemas/Schema";
import rateLimited from "@/rateLimiter";
import { revalidatePath } from "next/cache";
import { NextApiResponse } from "next";

export async function POST(req:NextRequest, response:NextApiResponse) {

    try {
        
        const email = req.headers.get("u-email");
        const name = req.headers.get("u-name");
        const dp = req.headers.get("u-dp");


        if(rateLimited(`${email}-deleteComment`, 1000 * 30)) {

            return NextResponse.json({ error: "Too many request !!" }, {status: 429});
        }

        const body = await req.json();

        if(!body.blogID || !body.commentID) return NextResponse.json({error: "Provide blogID & commentID."});
    
        const blog = await BlogModel.findById(body.blogID);
    
        if(!blog) return NextResponse.json({error: "Blog not found."});
    
        const comment = blog.comments.find((c:any) => c._id.equals(body.commentID));
        
        if(!comment) return NextResponse.json({error: "Comment not found."});
    
    
        if(email === comment.email || email === "ady.ashim@gmail.com") {
    
    
            const res = await BlogModel.updateOne({_id: body.blogID}, { $pull: { comments: { _id: body.commentID } } });
    
            if ( res ) {
                return NextResponse.json({data: "Comment deleted."});
            }
    
            return NextResponse.json({error: "Failed to delete comment."});
        }
        
        return NextResponse.json({error: "Unauthorized !! to delete comment."});
        
    } catch (error) {
        console.log("Error deleting comment: "+ error);
        return NextResponse.json({error: "Failed to delete comment."});
    }
}
