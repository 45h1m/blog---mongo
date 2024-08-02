import { getBlogs, getComments } from "@/_actions/blogActions";
import rateLimited from "@/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: Request,
    { params }: { params: { _id: string } }) {
    try {
        if (!params?._id) return NextResponse.json({ error: "Provide blogID." });
        const blogID = params?._id;

        const comments = await getComments(blogID);

        if (comments) return NextResponse.json(comments);

        return NextResponse.json({ error: "No comments found." });

    } catch (error) {
        console.log("Error sending comments: " + error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
