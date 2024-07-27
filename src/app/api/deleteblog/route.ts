import { deleteBlog } from "@/_actions/blogActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const email = req.headers.get("u-email");

        if (email !== "ady.ashim@gmail.com") {
            return NextResponse.json({ error: "Unauthorized !!" });
        }

        const {id, slug} = await req.json();
        const res = await deleteBlog(id, slug);

        if(res) return NextResponse.json({ success: "Blog deleted: " + slug });
        return NextResponse.json({ error: "Couldn't delete blog !" });

    } catch (error) {
        console.log("Faled to delete blog: " + error);
        return NextResponse.json({ error: "Something went wrong !!" });
    }
}
