import { publishBlog } from "@/_actions/blogActions";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, response:NextApiResponse) {
    try {
        const email = req.headers.get("u-email");

        if (email !== "ady.ashim@gmail.com") {
            return NextResponse.json({ error: "Unauthorized !!" });
        }

        const {id, slug} = await req.json();
        const res = await publishBlog(id, slug);

        if(res) {
            
            return NextResponse.json({ success: "Blog published: " + slug });
        }
        return NextResponse.json({ error: "Couldn't update blog to publish ! " });

    } catch (error) {
        console.log("Faled to approve blog: " + error);
        return NextResponse.json({ error: "Something went wrong !!" });
    }
}
