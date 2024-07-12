import { getComments } from "@/_actions/blogActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
        
    return NextResponse.json({message: "route working"});
    
    return NextResponse.json({error: "Something went wrong"});
}
