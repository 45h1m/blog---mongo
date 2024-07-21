import { getLogs } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    const email = req.headers.get("u-email");

    if(email === "ady.ashim@gmail.com") {
        const logs = getLogs();
        return NextResponse.json(logs);
    }
    
    return NextResponse.json({error: "Unauthorized !!"});
}
