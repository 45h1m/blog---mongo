import { revalidatePath } from 'next/cache'
import rateLimited from "@/rateLimiter";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse, } from "next/server";
import { getBlogs } from '@/_actions/blogActions';

export async function POST(req: NextRequest, res:NextApiResponse) {
    try {
        
        const email = req.headers.get("u-email");

        if(email !== "ady.ashim@gmail.com") throw new Error("Unauthorized: "+ email);

        // if(rateLimited(`${email}-postComment`, 1000 * 30)) {
            
        //     return NextResponse.json({ error: "Too many request !!" }, {status: 429});
        // }
        
        const {path} = await req.json();

        if(!path) throw new Error("Provide path to revalidate.");

        if(path === "allslugs") {

            const {blogs} = await getBlogs();
            blogs?.forEach(blog => revalidatePath("/blog/"+ blog.slug));
            return NextResponse.json({ success: "Revalidated : /blog/[slug]"});
        }

        revalidatePath(path);

        return NextResponse.json({ success: "Revalidated : " + path});

    } catch (error) {
        console.log("Error revalidating: "+ error);
        return NextResponse.json({ error: "Failed to revalidate: " + error});
    }
}
