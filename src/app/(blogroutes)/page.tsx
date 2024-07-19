import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { Metadata } from "next";
import Stories from "@/components/StoriesSection";
import { postStory } from "@/_actions/storyActions";
import { StoryType } from "@/types";
import { generateAMPs } from "@/lib/generateStaticHTML";

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
    // const newStory: StoryType = {
    //     title: "Track Realtime BPM & Blood Oxygen Level 🧐",
    //     author: "Flamer",
    //     authorDP: "/flamer.png",
    //     cover: {
    //         image: "assets/images/oxilive/oxi-s-cover.webp",
    //         audio: null,
    //     },
    //     slug: "bpm-oxygen-monitoring-oxilive",
    //     pages: [
    //         {
    //             image: "assets/images/oxilive/oxi-s-live.webp",
    //             title: "Realtime Updates",
    //             description: "A pulse oximeter measures your blood oxygen levels and pulse. A low level of oxygen saturation may occur if you have certain health conditions.",
    //             audio: null,
    //             video: null,
    //             href: "/blog/oxilive-oxygen-bpm-app",
    //         },
    //         {
    //             image: "assets/images/oxilive/oxi-s-graph.webp",
    //             title: "Interactive Bar Graph",
    //             description: "Monitoring your BPM and blood-oxygen levels throughout the day can help you identify patterns and make informed decisions to improve your physical and mental well-being.",
    //             audio: null,
    //             video: null,
    //             href: "/blog/oxilive-oxygen-bpm-app",
    //         },
    //         {
    //             image: "assets/images/oxilive/oxi-s-history.webp",
    //             title: "Records History Per Day Basis",
    //             description: "Only logged-in user can use this app. App uses JWT for authentication & authorization. User can log in with simple OTP to from email.",
    //             audio: null,
    //             video: null,
    //             href: "/blog/oxilive-oxygen-bpm-app",
    //         },
    //     ],
    //     nexthref: "/blog/oxilive-oxygen-bpm-app",
    // };

    // const res = await postStory(newStory);

    // console.log(res);

    return (
        <main className="">
            <div className="sm:container">
                <Stories />
                <a
                    href="/blog"
                    className="mx-auto flex w-fit items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white font-semibold mt-2"
                >
                    View Blogs{" "}
                    <span className="pt-1">
                        <MoveUpRight size={18} />
                    </span>
                </a>
            </div>
        </main>
    );
}
