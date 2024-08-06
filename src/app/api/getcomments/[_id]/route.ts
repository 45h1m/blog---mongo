import { getBlogs, getComments } from "@/_actions/blogActions";
import rateLimited from "@/rateLimiter";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest,
    { params }: { params: { _id: string } }) {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const token = await getToken({ req: request, secret });
        const email = token?.email!;

        console.log(email)

        if (!params?._id) return NextResponse.json({ error: "Provide blogID." });
        const blogID = params?._id;

        const comments = await getComments(blogID);
        let publishedComments = comments.map((com:any) => com.email = "hidden");

        if(email && email === "ady.ashim@gmail.com") return NextResponse.json(comments);
            
        publishedComments = comments.filter((com:any) => com.published);

        if (publishedComments) return NextResponse.json(publishedComments);

        return NextResponse.json({ error: "No comments found." });

    } catch (error) {
        console.log("Error sending comments: " + error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
