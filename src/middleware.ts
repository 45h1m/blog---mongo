import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    try {

        const secret = process.env.NEXTAUTH_SECRET;
        const token = await getToken({ req, secret });

        if (token) {
            const res = NextResponse.next();
            res.headers.set("u-name", token.name!);
            res.headers.set("u-email", token.email!);
            res.headers.set("u-dp", token.picture!);

            return res;
        }

        return NextResponse.json({ error: "Unauthenticated !!" });
        
    } catch (error) {
        console.log("Error in middleware: " + error);
        return NextResponse.json({ error: "Unauthenticated !!" });
    }
}

export const config = {
    matcher: ["/api/postcomment", "/api/deletecomment", "/api/getlogs", "/api/postblog", "/api/approveblog"],
};
