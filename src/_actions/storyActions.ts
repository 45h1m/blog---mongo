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
    title: "Track Realtime Power Consumption 😱",
    author: "Flamer",
    authorDP: "/flamer.png",
    cover: {
        image: "assets/images/power-t/power-s-cover.webp",
        audio: null,
    },
    slug: "power-tracker-app-story",
    pages: [
        {
            image: "assets/images/power-t/power-s-ss.webp",
            title: "Power Tracker App + ESP8266",
            description: "Track realtime power with our App and Hardware setup. Here is the screenshot of the App.",
            audio: null,
            video: null,
            href: "/blog/power-tracker-app-iot-fullstack",
        },
        {
            image: "assets/images/power-t/power-s-realtime.webp",
            title: "Realtime Power Readings",
            description: "You can see realtime Wattage, voltage, ampere with time. Also interactive realtime graph gives visual insights into the system.",
            audio: null,
            video: null,
            href: "/blog/power-tracker-app-iot-fullstack",
        },
        {
            image: "assets/images/power-t/power-s-saved.webpg",
            title: "Data Is Saved In The Server",
            description: "The data is saved per day basis on the backend server. You can retrieve data at any time in graphical representation. Max Min usage.",
            audio: null,
            video: null,
            href: "/blog/power-tracker-app-iot-fullstack",
        },
        {
            image: "assets/images/power-t/power-s-switch.webp",
            title: "Remote Switches - ON/OFF",
            description: "These switches can be used to control any load from online, it's realtime. On the hardware part there is relay setup for switching.",
            audio: null,
            video: null,
            href: "/blog/power-tracker-app-iot-fullstack",
        },
    ],
    nexthref: "/blog/power-tracker-app-iot-fullstack",
};