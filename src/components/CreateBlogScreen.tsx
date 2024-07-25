"use client";
import ImagePicker from "@/components/ImagePicker";
import PreviewBlog from "@/components/PreviewBlog";
import TagsInput from "@/components/TagsInput";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import throttle from "lodash.throttle";


const CreateBlogScreen = () => {
    const [contentValue, setContentValue] = useState("### write your blog using MarkDown");
    const [processedValue, setProcessedValue] = useState(contentValue);
    const [titleValue, setTitleValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [slugValue, setSlugValue] = useState("any-good-slug");
    const [imgDrawerOpen, setImgDrawerOpen] = useState(false);
    const [editSectionOpen, setEditSectionOpen] = useState(false);
    const [objectUrls, setObjectUrls] = useState<any>([]);
    let tags: Array<string> = [];
    let selectedImages: Array<File> = [];
    const mdImgMatcher = /!\[.*?\]\(.*?\)/g;

    const onTagsChange = (_tags: any) => {
        tags = [..._tags];
    };

    const onImageChange = (_images: any) => {
        selectedImages = [..._images];
        let _urlNames = selectedImages.map((img) => ({
            url: URL.createObjectURL(img),
            imgName: img.name,
        }));
        setObjectUrls([..._urlNames]);
        console.log(selectedImages);
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

                img = img ? img : "admin-dp-small.gif";

                console.log(url);
                console.log(imgName);
                console.log(img);
                match = `![${img.imgName}](${img.url})`;
                return match;
            })
        );
    }, 5000);

    useEffect(() => {
        throttledEffect(contentValue);
        return () => {
            throttledEffect.cancel();
        };
    }, [contentValue]);

    return (
        <div className="p-4 relative">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 border rounded-lg flex flex-col gap-3">
                <h1 className="text-xl font-bold text-slate-700 dark:text-slate-300">New blog 📝</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-title-input" className="text-sm text-slate-600 dark:text-slate-300">
                        Title
                    </label>
                    <input
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
                        Maximum 8 tags. Include only necessary tags.
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
                                        className="text-sm text-slate-600 dark:text-slate-300 border px-2 py-1 rounded-md"
                                        onClick={() => setEditSectionOpen(false)}
                                    >
                                        Close preview
                                    </button>
                                )}
                            </div>
                            <TextareaAutosize
                                placeholder="Content"
                                className="bg-white dark:bg-slate-900 px-3 py-2 rounded-md border-2 text-sm max-h-52"
                                value={contentValue}
                                onChange={(e) => setContentValue(e.target.value)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setImgDrawerOpen(true);
                                }}
                            />
                            <div className="flex justify-between items-center">
                                {editSectionOpen ? (
                                    <label className="text-sm text-slate-600 dark:text-slate-300">Preview</label>
                                ) : (
                                    <button
                                        className="text-sm text-slate-600 dark:text-slate-300 border px-2 py-1 rounded-md"
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
                                            {selectedImages.length > 0 ? "Select image to insert into blog" : "First select images"}
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
                        className="bg-red-600 text-white px-4 font-semibold hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
                        title="Sign in to post comment"
                        aria-label="sign in"
                        onClick={() => alert("Give feedback about this creator screen 🍗")}
                    >
                        Send for approval
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogScreen;
