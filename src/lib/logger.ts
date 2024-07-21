import { NextRequest } from "next/server";
import { isoToIST } from "./utils";

const logs:any = [];

export function saveLog(req:NextRequest) {

    const ip = req.ip || req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
    const method = req.method;
    const url = req.nextUrl;
    const email = req.headers.get("u-email") || "nope";
    const timestamp = isoToIST(new Date);

    logs.push({timestamp, ip, method, url, email});
}

export function getLogs() {
    return logs;
}