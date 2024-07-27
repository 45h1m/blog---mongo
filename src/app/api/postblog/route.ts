import { postBlog } from "@/_actions/blogActions";
import rateLimited from "@/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function containsSpecialChars(str: string) {
    const specialChars = /[!@#$%^&*()_+=\[\]{};':"\\|,<>\/?]/;
    return specialChars.test(str);
}

export async function POST(req: NextRequest) {
    const uEmail = req.headers.get("u-email");
    const uName = req.headers.get("u-name");
    const uDP = req.headers.get("u-dp");

    try {

        if (rateLimited(`${uEmail}-postBlog`, 1000 * 60 * 2)) {
            console.log(uEmail + " is blocked to to post");
            return NextResponse.json({ error: "Too many request !!" }, { status: 429 });
        }

        const formData = await req.formData();

        const title = formData.get("title");
        const slug = formData.get("slug");
        const desc = formData.get("description");
        const content = formData.get("content");
        const cover = formData.get("cover");
        const tags = formData.getAll("tag");
        const files: any = formData.getAll("files");

        console.log("Title:", title);
        console.log("Slug:", slug);
        console.log("Description:", desc);
        console.log("Content:", content);
        console.log("Cover:", cover);
        console.log("Tags:", tags);
        console.log("Files:", files);

        if (!(title && slug && desc && content && cover && tags.length > 2 && files.length >= 0)) {
            throw new Error("Not all requied fields are given !!");
        }

        if (title !== null && typeof title !== "string") {
            throw new Error("Title must be a string");
        }

        if (slug !== null && typeof slug !== "string") {
            throw new Error("Slug must be a string");
        }

        if (desc !== null && typeof desc !== "string") {
            throw new Error("Description must be a string");
        }

        if (content !== null && typeof content !== "string") {
            throw new Error("Content must be a string");
        }

        if (cover !== null && typeof cover !== "string") {
            throw new Error("Cover must be URL string");
        }

        if (Array.isArray(tags)) {
            // @ts-ignore
            if (tags.some((tag) => typeof tag !== "string")) {
                throw new Error("Tags must be an array of strings");
            }
        } else if (typeof tags !== "string") {
            throw new Error("Tag must be a string");
        }

        // @ts-ignore
        if (!(files instanceof File || !files.some((file) => !(file instanceof File)))) {
            throw new Error("Files must be an array of Files");
        }

        const newBlog = {
            title: title,
            description: desc,
            author: uName!,
            thumbnail: "/flamer-og.webp",
            slug: slug.replaceAll(" ", ""),
            authorDP: uDP!,
            content: content,
            tags: tags.map((tag) => tag as string),
            published: false,
        };

        console.log(newBlog);

        const blogUploaded = await postBlog(newBlog);

        console.log(blogUploaded);

        if (!blogUploaded) {
            throw new Error("Blog post to DB failed.");
        }

        return NextResponse.json({ success: "Blog posted." });

        const uploadDir = path.join(process.cwd(), "public/images/" + slug?.toString().trim());

        console.log(uploadDir);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        if (files) {
            if (Array.isArray(files)) {
                files.forEach(async (file: any) => {
                    if (containsSpecialChars(file.name)) {
                        throw new Error("Invalid file name detected");
                    }
                    const buffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(buffer);
                    fs.writeFileSync(`${uploadDir}/${file.name}`, uint8Array);
                    console.log("Written: " + file.name);
                });
            } else {
                if (containsSpecialChars(files.name)) {
                    throw new Error("Invalid file name detected");
                }
                const buffer = await files.arrayBuffer();
                const uint8Array = new Uint8Array(buffer);
                fs.writeFileSync(`${uploadDir}/${files.name}`, uint8Array);
                console.log("Written: " + files.name);
            }
        }

        return NextResponse.json({ success: "Blog posted." });
    } catch (error) {
        console.log("error posting blog: " + error);
        return NextResponse.json({ error: "Blog posting failed." });
    }
}
