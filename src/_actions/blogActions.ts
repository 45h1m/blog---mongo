"use server";

import BlogModel from "@/schemas/Schema";
import connectDB from "@/lib/connectDB";
import { BlogPost } from "@/types";
import mongoose from "mongoose";

export async function getBlogs() {
    try {
        await connectDB();

        const blogs = await BlogModel.find();

        return { blogs };
    } catch (error) {
        return { error: error };
    }
}

export async function postBlog({ title, description, content, author, authorDP, tags, thumbnail, slug }: BlogPost) {

    await connectDB();

    const newBlog = new BlogModel({
        title,
        description,
        content,
        author,
        authorDP,
        tags,
        thumbnail,
        slug
    });

    newBlog
        .save()
        .then((blog:any) => {
            console.log("Blog posted: " + blog.title);
        })
        .catch((error:any) => {
            console.log("Failed posting blog: " + newBlog.title + "\nError: " + error);
        });
}

// export async function postAllBlogs() {

//     await connectDB();

//     const blogs: any = await getAllBlogMeta();

//     blogs.forEach(async (metadata:any) => {
//         const blog = await getBlogBySlug(metadata.realSlug);

//         const title = metadata.title;
//         const description = metadata.description;
//         const author = metadata.author;
//         const authorDP = metadata.dp;
//         const thumbnail = metadata.thumbnail;
//         const tags = metadata.tags;
//         const content = blog.content;
//         const slug = metadata.realSlug;

//         await postBlog({
//             title,
//             description,
//             content,
//             author,
//             authorDP,
//             tags,
//             thumbnail,
//             slug
//         });
//     });
// }


export async function getBlog(slug:string) {

    await connectDB();

    const blog = await BlogModel.findOne({ slug });

    return blog;
}