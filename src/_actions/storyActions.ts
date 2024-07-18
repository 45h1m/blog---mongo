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

const newStoty: StoryType = {
    title: "Do you like pets? Welcome to pet zone!",
    author: "Flamer",
    authorDP: "/flamer.png",
    cover: {
        image: "assets/cover.jpg",
        audio: null,
    },
    slug: "the-curious-cat-story",
    pages: [
        {
            image: "/assets/cat.jpg",
            title: "The Curious Cat",
            description: "Whiskers yawned and stretched, his paws reaching out across the sunlit windowsill. Today was the day - moving day. His humans bustled about, packing boxes and chattering excitedly.",
            audio: null,
            video: null,
            href: "/blog",
        },
        {
            image: "assets/dog.jpg",
            title: "The Great Dogs",
            description: "Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.",
            audio: null,
            video: null,
            href: "/blog",
        },
        {
            image: "assets/bird.jpg",
            title: "The Great Dogs",
            description: "Feather peered over the edge of the nest, her tiny heart racing. Her siblings had already taken the leap, but she hesitated. The ground seemed so far away. You can do it, her mother chirped encouragingly from a nearby branch.",
            audio: "/assets/bird-singing.mp3",
            video: null,
            href: "/blog",
        },
        {
            image: "assets/rabbit.jpg",
            title: "Little Bunny",
            description: "Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful.",
            audio: null,
            video: "assets/rabbit.mp4",
            href: "/blog",
        },
    ],
    nexthref: "/blog",
};