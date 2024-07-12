import { getBlogs, postComment } from "@/_actions/blogActions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { blogID, content }: any = await req.json();

    if(!content || !blogID) return NextResponse.json({ error: "Comment posting failed: " })

    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });

    const updatedComments = await postComment({ name: token?.name!, email: token?.email!, dp: token?.picture!, content }, blogID);

    if (updatedComments) return NextResponse.json({ message: "Comment posted" });
    else return NextResponse.json({ error: "Comment posting failed: " });
}
