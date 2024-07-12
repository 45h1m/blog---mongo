import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    
    const path = req.nextUrl.pathname;
    
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    
    if (token) 
        return NextResponse.next();
        
        
    return NextResponse.json({ error: "Unauthorized" });
}

export const config = {
    matcher: ["/api/postcomment"],
};
