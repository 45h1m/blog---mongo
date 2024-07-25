"use client";

import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const ImagePicker = ({onImageChange}:any) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        if(selectedImages.length + e.target.files.length > 6) return alert("Maximum 6 images can be selected !");

        setSelectedImages((prev) => [...prev, ...Array.prototype.slice.call(e.target.files!)]);
    };
    
    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setSelectedImages((prev) => prev.filter((file, i) => i !== index));
    };

    useEffect(() => {
        onImageChange(selectedImages);
    },[selectedImages])

    return (
        <div className="bg-white dark:bg-slate-900 p-2 rounded-md border-2 text-sm max-h-96 flex flex-wrap gap-2 items-center">
            {selectedImages.map((file, i) => (
                <div
                    key={"selected-img-" + i}
                    className={`"bg-slate-200 dark:bg-slate-800 size-20 rounded-sm border-2 text-slate-500 dark:text-slate-400 p-1 relative overflow-hidden`}
                >
                    <img
                        className="rounded-sm absolute left-0 top-0 w-full h-full object-cover z-0"
                        src={URL.createObjectURL(file)}
                        alt="selected-image-thumbnail"
                    ></img>
                    <X
                        className="absolute left-0 top-0 bg-slate-200 dark:bg-slate-800 ml-auto cursor-pointer z-10"
                        onClick={(e: any) => handleRemoveImage(e, i)}
                        width={20}
                    />
                    {i === 0 && <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent flex justify-center py-2 w-full text-slate-200 text-xs uppercase">Cover</div>}
                </div>
            ))}

            <input onChange={onChangeHandler} type="file" accept=".webp" id="upload-input" multiple className="hidden" />
            {selectedImages.length < 6 && (<label
                htmlFor="upload-input"
                className="cursor-pointer text-sm bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 size-20 rounded-sm border-2 flex items-center justify-center text-center border-slate-300 dark:border-slate-600 border-dashed"
            >
                <Plus />
            </label>)}
            <p className="text-sm text-slate-500">The first selected image will be the cover.</p>
        </div>
    );
};

export default ImagePicker;
