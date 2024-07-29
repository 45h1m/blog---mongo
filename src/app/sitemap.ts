import { getBlogs } from "@/_actions/blogActions";
import { getStories } from "@/_actions/storyActions";
import { MetadataRoute } from "next";

const BASE_URL = "https://firebit.in";

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    const {blogs}: any = await getBlogs();
    const stories: any = await getStories();

    const sitemap = [];

    sitemap.push({
        url: `${BASE_URL}`,
        lastModified: new Date,
    });
    sitemap.push({
        url: `${BASE_URL}/blog`,
        lastModified: new Date,
    });

    if (Array.isArray(blogs)) {
        blogs.forEach((blog) => {
            sitemap.push({
                url: `${BASE_URL}/blog/${blog.slug}`,
                lastModified: new Date(blog.updatedAt),
            });
        });
    }

    if (Array.isArray(stories)) {
        stories.forEach((story) => {
            sitemap.push({
                url: `${BASE_URL}/stories/${story.slug}`,
                lastModified: new Date(story.updatedAt),
            });
        });
    }

    return sitemap;
}
