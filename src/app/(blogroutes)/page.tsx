import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { Metadata } from "next";
import Stories from "@/components/StoriesSection";

export async function generateMetadata(props: any): Promise<Metadata> {
    return {
        title: "Blogs",
        description: "Tech blogs & projects",
        openGraph: {
            images: [{ url: "/flamer-og.webp" }],
        },
    };
}

export default async function Home() {
    return (
        <main className="">
            <div className="sm:container">
                <Stories />
                <a href="/blog" className="mx-auto flex w-fit items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white font-semibold mt-2">
                    View Blogs{" "}
                    <span className="pt-1">
                        <MoveUpRight size={18} />
                    </span>
                </a>
            </div>
        </main>
    );
}
