"use client";
import ImagePicker from "@/components/ImagePicker";
import PreviewBlog from "@/components/PreviewBlog";
import TagsInput from "@/components/TagsInput";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import throttle from "lodash.throttle";
import debounce from "lodash/debounce";
import axios from "axios";
import { LoaderCircle, MoveUpRight } from "lucide-react";

let lastClicked = new Date().getTime();
let lastTimeout: any = null;

const CreateBlogScreen = () => {
    const [contentValue, setContentValue] = useState(`## Write your blog using MarkDown

### Put links

-  Some item
-  another item

> note: **It's easy**

\`highlight\` any text

Write paragraphs *Italic*  **Bold**

Write codes
\`\`\`sh
./ashim.das
\`\`\`

Insert any [Link](https://63b935305c329268d5a8cd41--ashimdas.netlify.app) 

##### Insert images with URL & alt-text
![alt-text](/flamer-og.webp)`);
    const [processedValue, setProcessedValue] = useState(contentValue);
    const [titleValue, setTitleValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [slugValue, setSlugValue] = useState("any-good-slug");
    const [imgDrawerOpen, setImgDrawerOpen] = useState(false);
    const [editSectionOpen, setEditSectionOpen] = useState(false);
    const [objectUrls, setObjectUrls] = useState<any>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [cover, setCover] = useState("");
    let tags: Array<string> = [];
    const mdImgMatcher = /!\[.*?\]\(.*?\)/g;

    const onTagsChange = (_tags: any) => {
        tags = [..._tags];
    };

    const onImageChange = (_images: any) => {
        setSelectedImages([..._images]);
    };

    const throttledEffect = throttle((contentValue: any) => {
        setProcessedValue(
            contentValue.replaceAll(mdImgMatcher, (match: any) => {
                const url = match
                    .match(/\(.*?\)/)?.[0]
                    .slice(1)
                    .replace(")", "");

                const imgName = url?.split("/").at(-1);

                let img = objectUrls.find((img: any) => img.imgName === imgName);

                // img = img ? img : "admin-dp-small.gif";

                if (!img) return match;

                console.log(url);
                console.log(imgName);
                console.log(img);
                match = `![${img.imgName}](${img.url})`;
                return match;
            })
        );
    }, 5000);

    const handleFormSubmit = (e: any) => {
        e.preventDefault();

        if (!(contentValue && titleValue && descValue && slugValue && selectedImages.length >= 0 && cover && tags.length > 2)) {
            return alert("Fill up all the fields !");
        }

        setUploading(true);

        const formData = new FormData();

        selectedImages.forEach((file) => {
            formData.append("files", file);
        });

        formData.append("title", titleValue);
        formData.append("slug", slugValue);
        formData.append("description", descValue);

        tags.forEach((tag) => {
            formData.append("tag", tag);
        });

        formData.append("content", contentValue);
        formData.append("cover", cover);

        axios
            .post("/api/postblog", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (e) => {
                    const percentCompleted = Math.round((e.loaded * 100) / e.total!);
                    setUploadProgress(percentCompleted);
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setUploaded(true);
                }

                if (res.data.error) {
                    setUploadProgress(0);
                    setUploading(false);
                    alert(res.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
                setUploading(false);
                alert(error);
            });
    };

    useEffect(() => {
        const current = new Date().getTime();

        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(
            () =>
                setProcessedValue(
                    contentValue.replaceAll(mdImgMatcher, (match: any) => {
                        console.log("trigger");
                        const url = match
                            .match(/\(.*?\)/)?.[0]
                            .slice(1)
                            .replace(")", "");
                        const imgName = url?.split("/").at(-1);
                        let img = objectUrls.find((img: any) => img.imgName === imgName);
                        if (!img) return match;
                        match = `![${img.imgName}](${img.url})`;
                        return match;
                    })
                ),
            1000
        );
    }, [contentValue]);

    useEffect(() => {
        setCover(`/images/${slugValue}/${selectedImages[0]?.name || ""}`);
        let _urlNames = selectedImages.map((img) => ({
            url: URL.createObjectURL(img),
            imgName: img.name,
        }));
        setObjectUrls([..._urlNames]);
    }, [selectedImages]);

    return (
        <div className="p-4 relative">
            {uploading && (
                <div className="p-5 fixed z-30 top-0 left-0 w-full h-full bg-slate-800/50 backdrop-blur-sm flex justify-center items-center">
                    <div className="shadow-lg p-4 bg-slate-100 dark:bg-slate-800 flex flex-col gap-2 justify-center items-center rounded-lg h-min">
                        <h2 className="font-semibold text-lg">{titleValue || "Blog title"}</h2>
                        <p>
                            {uploaded ? (
                                "Blog was uploaded 🎉, Your blog will be published once checked 😎."
                            ) : (
                                <span className="flex gap-2">
                                    <LoaderCircle width={20} className="animate-spin" />
                                    Your blog is uploading..
                                </span>
                            )}
                        </p>
                        {uploaded || <h3 className="text-xl">{uploadProgress}%</h3>}
                        {uploadProgress === 100 && !uploaded && <p>Wait, processing..</p>}
                        {uploaded && (
                            <a
                                href="/blog"
                                className="text-md shadow-lg flex h-min w-fit items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-400 rounded-sm text-white font-semibold mt-2"
                            >
                                View Blogs{" "}
                                <span>
                                    <MoveUpRight size={24} />
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={handleFormSubmit} className="bg-slate-50 dark:bg-slate-900 p-4 border rounded-lg flex flex-col gap-3">
                <h1 className="text-xl font-bold text-slate-700 dark:text-slate-300">New blog 📝</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-title-input" className="text-sm text-slate-600 dark:text-slate-300">
                        Title
                    </label>
                    <input
                        minLength={10}
                        required
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        type="text"
                        name="blog-title-input"
                        id="blog-title-input"
                        placeholder="Title"
                        className="bg-white dark:bg-slate-900 px-3 py-2 rounded-md border-2 text-sm"
                    />
                    <label htmlFor="blog-title-input" className="text-sm text-slate-500">
                        Title will be shown in main blog view, no need to give another in content.
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-slug-input" className="text-sm text-slate-600 dark:text-slate-300">
                        Slug
                    </label>
                    <input
                        minLength={10}
                        required
                        onChange={(e) => setSlugValue(e.target.value)}
                        type="text"
                        name="blog-slug-input"
                        id="blog-slug-input"
                        placeholder="Slug"
                        className="bg-white dark:bg-slate-900 px-3 py-2 rounded-md border-2 text-sm"
                    />
                    <label htmlFor="blog-slug-input" className="text-sm text-slate-500">
                        It will be the end URL/link (eg: firebit.in/blog/<b>your-relatable-text-slug</b>)
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-desc-input" className="text-sm text-slate-600 dark:text-slate-300">
                        Description
                    </label>
                    <input
                        minLength={20}
                        required
                        onChange={(e) => setDescValue(e.target.value)}
                        type="text"
                        name="blog-desc-input"
                        id="blog-desc-input"
                        placeholder="Description"
                        className="bg-white dark:bg-slate-900 px-3 py-2 rounded-md border-2 text-sm"
                    />
                    <label htmlFor="blog-desc-input" className="text-sm text-slate-500">
                        Displayed on blog card.
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-300">Tags</label>
                    <TagsInput callback={onTagsChange} />
                    <label htmlFor="blog-desc-input" className="text-sm text-slate-500">
                        Minimum 3 tags & maximum 8 tags. Include only necessary tags.
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-300">Add Images</label>
                    <ImagePicker onImageChange={onImageChange} />
                </div>
                <div className={editSectionOpen ? `fixed w-full h-[90vh] top-[5rem] left-0 p-3 bg-slate-950/50 z-20` : ""}>
                    <div
                        className={`bg-slate-50 dark:bg-slate-900 ${
                            editSectionOpen ? "p-3 md:container mx-auto" : ""
                        } h-full rounded-lg flex flex-col`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-slate-600 dark:text-slate-300">Content</label>

                                {editSectionOpen && (
                                    <button
                                        className="text-sm text-slate-100 font-semibold border px-2 py-1 rounded-md bg-red-600"
                                        onClick={() => setEditSectionOpen(false)}
                                    >
                                        Close preview
                                    </button>
                                )}
                            </div>
                            <TextareaAutosize
                                required
                                placeholder="Content"
                                className="bg-white dark:bg-slate-900 px-3 py-2 rounded-md border-2 text-sm max-h-52"
                                value={contentValue}
                                onChange={(e) => setContentValue(e.target.value)}
                            />
                            {editSectionOpen && (
                                <button
                                    className="text-sm text-slate-50 font-semibold border px-2 py-1 rounded-md bg-violet-600 w-fit"
                                    onClick={() => setImgDrawerOpen(true)}
                                >
                                    Select Images
                                </button>
                            )}
                            <div className="flex justify-between items-center">
                                {editSectionOpen ? (
                                    <label className="text-sm text-slate-600 dark:text-slate-300">Preview</label>
                                ) : (
                                    <button
                                        className="text-sm text-slate-50 font-semibold border px-2 py-1 rounded-md bg-red-600"
                                        onClick={() => setEditSectionOpen(true)}
                                    >
                                        Open Preview + Editor
                                    </button>
                                )}
                            </div>
                            <Drawer open={imgDrawerOpen} onOpenChange={setImgDrawerOpen}>
                                <DialogTitle className="hidden">Insert image</DialogTitle>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerDescription>
                                            {selectedImages.length > 0
                                                ? "Select image to insert into blog"
                                                : 'First select images in "Add Images" section'}
                                        </DrawerDescription>
                                    </DrawerHeader>

                                    <div className="bg-white dark:bg-slate-900 p-2 rounded-md border-2 text-sm max-h-96 flex flex-wrap gap-2 items-center">
                                        {objectUrls.map((urlName: any, i: number) => (
                                            <div
                                                key={"selected-img-" + i}
                                                className={`bg-slate-200 dark:bg-slate-800 size-20 rounded-sm border-2 text-slate-500 dark:text-slate-400 p-1 relative overflow-hidden`}
                                            >
                                                <img
                                                    className="cursor-pointer rounded-sm absolute left-0 top-0 w-full h-full object-cover z-0"
                                                    src={urlName.url}
                                                    alt="selected-image-thumbnail"
                                                    title={urlName.imgName}
                                                    onClick={() => {
                                                        window.navigator.clipboard
                                                            .writeText(`![${urlName.imgName}](/images/${slugValue}/${urlName.imgName})`)
                                                            .then(() => setImgDrawerOpen(false));
                                                    }}
                                                ></img>
                                            </div>
                                        ))}
                                    </div>

                                    <DrawerFooter>
                                        <DrawerClose>
                                            <label>Cancel</label>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>
                        {editSectionOpen && (
                            <div className="h-full overflow-y-auto">
                                <h1 className="font-bold text-3xl border-l-4 border-red-600 pl-2 mt-4 pb-2 mb-3">{titleValue}</h1>
                                <PreviewBlog content={processedValue} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-300">We will publish blog after checking.</label>
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 font-semibold hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
                        title="Sign in to post comment"
                        aria-label="sign in"
                    >
                        Send for approval
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlogScreen;
