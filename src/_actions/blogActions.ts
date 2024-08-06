"use server";

import { BlogModel, CommentModel } from "@/schemas/Schema";
import connectDB from "@/lib/connectDB";
import { BlogPost, Comment } from "@/types";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
    try {
        await connectDB();

        const blogs = await BlogModel.find();

        return { blogs };
    } catch (error) {
        return { error: error };
    }
}

export async function postBlog({ title, description, content, author, authorDP, tags, thumbnail, slug, published }: BlogPost) {
    return new Promise(async (resolve, reject) => {
        await connectDB();

        const newBlog = new BlogModel({
            title,
            description,
            content,
            author,
            authorDP,
            tags,
            thumbnail,
            slug,
            published,
        });

        newBlog
            .save()
            .then((blog: any) => {
                console.log("Blog posted: " + blog.title);
                resolve("Blog posted successfully");
            })
            .catch((error: any) => {
                console.log("Failed posting blog: " + newBlog.title + "\nError: " + error);
                reject("Failed posting blog");
            });
    });
}

export async function postComment({ name, email, dp, content }: Comment, blogID: string) {
    try {
        await connectDB();

        const newComment = new CommentModel({
            name,
            email,
            dp,
            content,
        });

        const updatedBlog = await BlogModel.findByIdAndUpdate(blogID, { $push: { comments: newComment } }, { upsert: true, new: true });

        if (updatedBlog) console.log("Comment posted: ");

        if (updatedBlog) {
            revalidatePath("/api/getcomments/" + blogID);
            return updatedBlog;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error posting comment: " + error);
        return null;
    }
}

export async function getComments(blogID: string) {
    await connectDB();

    let blog = null;

    try {
        blog = await BlogModel.findById(blogID);

        if (blog) return blog.comments;
        else return null;
    } catch (error) {
        console.log("Error finding comments: " + error);
        return null;
    }
}

export async function publishBlog(id: string, slug: string) {
    await connectDB();

    const res = await BlogModel.updateOne({ _id: id }, { $set: { published: true } });

    if (res) {
        revalidatePath("/blog");
        revalidatePath("/blog/[slug]", "page");
        revalidatePath("/api/allblogs");
        return res;
    }

    return null;
}

export async function deleteBlog(id: string, slug: string) {
    await connectDB();

    const res = await BlogModel.updateOne({ _id: id }, { $set: { published: false } });

    if (res) {
        revalidatePath("/blog");
        revalidatePath("/blog/[slug]", "page");
        return res;
    }
    return null;
}

export const deleteComment = async ({ blogID, commentID }: any) => {
    await connectDB();

    try {
        // const res = await BlogModel.findOne({_id: blogID, "comments._id": commentID}, { $set: { "comments.$setField": {published: false} } });
        const res = await BlogModel.updateOne(
            { _id: blogID },
            {
                $set: {
                    "comments.$[comment].published": false,
                },
            },
            {
                upsert: true,
                arrayFilters: [{ "comment._id": commentID }],
            }
        );

        if (!res) return null;

        return res;
    } catch (error) {
        console.log("Error deleting comment: " + error);
    }
};
export const publishComment = async ({ blogID, commentID }: any) => {
    await connectDB();

    try {
        // const res = await BlogModel.findOne({_id: blogID, "comments._id": commentID}, { $set: { "comments.$setField": {published: false} } });
        const res = await BlogModel.updateOne(
            { _id: blogID },
            {
                $set: {
                    "comments.$[comment].published": true,
                },
            },
            {
                upsert: true,
                arrayFilters: [{ "comment._id": commentID }],
            }
        );

        if (!res) return null;

        return res;
    } catch (error) {
        console.log("Error publishing comment: " + error);
    }
};

// export async function addCommentsField() {
//     try {

//         const res = await BlogModel.updateMany({}, {$set: {comments: Array()}}, {upsert: true, multi: true});

//         console.log(res)

//         console.log('Updated all existing blogs to include comments field.');
//     } catch (error) {
//         console.error('Error updating blogs:', error);
//     }
// }
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
//             slug,
//         });
//     });
// }

export async function getBlog(slug: string) {
    await connectDB();

    const blog = await BlogModel.findOne({ slug });

    return blog;
}
