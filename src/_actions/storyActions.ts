"use server";

import connectDB from "@/lib/connectDB";
import { StoryModel } from "@/schemas/Schema";
import { StoryType } from "@/types";

export async function postStory({ title, author, authorDP, cover, slug, pages, nexthref }: StoryType) {
    try {
        await connectDB();

        const story = new StoryModel({
            title,
            author,
            authorDP,
            cover,
            slug,
            pages,
            nexthref,
        });
        await story.save();
        return story;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getStories() {
    
    try {
        
        await connectDB();

        const stories = await StoryModel.find();

        return stories;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const newStory: StoryType = {
    title: "Portable Fingerprint Attendance System 😱",
    author: "Flamer",
    authorDP: "/flamer.png",
    cover: {
        image: "assets/images/fingle/fingle-s-cover.webp",
        audio: null,
    },
    slug: "fingerprint-attendance-system-fingle",
    pages: [
        {
            image: "assets/images/fingle/fingle-s-home.webp",
            title: "Home Screen",
            description: "Minimal, user friendly, good UX. The system includes a hardware part.",
            audio: null,
            video: null,
            href: "/blog/fingle-attendance-app",
        },
        {
            image: "assets/images/fingle/fingle-s-enroll.webp",
            title: "Easily Enroll Attendee",
            description: "Fill up necessary fields and scan fingerprint on the device to enroll.",
            audio: null,
            video: null,
            href: "/blog/fingle-attendance-app",
        },
        {
            image: "assets/images/fingle/fingle-s-take.webp",
            title: "Automatically Takes Attendance",
            description: "After clicking take attendance system will automatically match when someone scans finger and records attendance.",
            audio: null,
            video: null,
            href: "/blog/fingle-attendance-app",
        },
        {
            image: "assets/images/fingle/fingle-s-history.webp",
            title: "Tracks Attendance History",
            description: "Any time admin can view attendance history. Also enrolled users can be modified or removed easily.",
            audio: null,
            video: null,
            href: "/blog/fingle-attendance-app",
        },
        {
            image: "assets/images/fingle/fingle-s-hw.webp",
            title: "The Hardware Part",
            description: "Made with jugad 😎 by our DIY guy(TECHMYO). The device connects with App via WiFi.",
            audio: null,
            video: null,
            href: "/blog/fingle-attendance-app",
        },
    ],
    nexthref: "/blog/fingle-attendance-app",
};