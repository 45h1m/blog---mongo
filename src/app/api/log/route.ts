import { incrementViews } from "@/_actions/blogActions";
import { NextRequest, NextResponse } from "next/server";

const incrementCount = async (url:string) => {
    
    const blogUrlPattern = /^https:\/\/[^\/]+\/blog\/[a-zA-Z0-9-]+$/;

    if(blogUrlPattern.test(url)) {
        const slug = url.split("/blog/")[1];

        const {blog, error} = await incrementViews(slug);

        if(blog) {

            return;
        }

        if(!error) {
            console.log("Error incrementing views "+ error);
        }
    }

}

export async function POST(req: NextRequest) {
    try {
        const email = req.headers.get("u-email");
        
        const { pageURL } = await req.json();

        const res = NextResponse.json({ success: "ok" });
        
        const cookie = req.cookies.get("visited-urls");

        if(!pageURL) return res;

        if(!cookie) {

            res.cookies.set("visited-urls", pageURL, {
                httpOnly: true,
                sameSite: "strict",
            });

            incrementCount(pageURL);
            return res;
        }

        const visited = cookie.value.includes(pageURL);

        if(!visited) {

            
            res.cookies.set("visited-urls", cookie.value + pageURL, {
                httpOnly: true,
                sameSite: "strict",
            });

            incrementCount(pageURL);
        }
        
        return res;

    } catch (error) {
        console.log("Error logging: " + error);
        return NextResponse.json({ error: "Failed to log: " + error });
    }
}
