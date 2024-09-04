import { getBlogBySlug } from "@/_actions/blogActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const {slug} = await req.json();

        if(!slug) return NextResponse.json({ error: "Provide slug" });

        const blog = await getBlogBySlug({slug});

        if(!blog) return NextResponse.json({ error: "Blog not found" });
        
        return NextResponse.json( blog );

    } catch (error) {
        console.log("Error in getBlogBySlug: " + error);
        return NextResponse.json({ error: "Failed to getBlogBySlug." });
    }
}
