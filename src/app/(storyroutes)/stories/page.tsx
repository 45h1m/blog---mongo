import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
    return {
        title: "Stories",
        description: "Tech blogs & projects",
        openGraph: {
            images: [{ url: "/flamer-og.webp" }],
        },
    };
}

export default async function Stories() {
    return <h1>Web Stories</h1>;
}
