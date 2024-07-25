"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TagsInput = ({ callback }: any) => {
    const [tags, setTags] = useState(Array<string>);
    const [inputVal, setInputVal] = useState("");

    const keyPressHandler = (e: any) => {
        setInputVal(e.target.value);

        const trigger = e.target.value.endsWith(' ') || e.target.value.endsWith('.') || e.target.value.endsWith(',');

        if (trigger && inputVal.trim() && tags.length < 8 ) {
            
            setTags((prev) => [...prev, inputVal.trim()]);
            setInputVal("");  
            
            return;
        }

    };

    const removeTag = (index: number) => {
        setTags((prev) => prev.filter((tag, i) => i !== index));
    };

    useEffect(() => {
        callback(tags);
    }, [tags, callback]);

    return (
        <div className="bg-white dark:bg-slate-900 p-2 rounded-md border-2 text-sm flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span
                    key={"tag-" + index + 1}
                    className="bg-slate-100 dark:bg-slate-800 p-1 px-2 rounded-sm border text-center text-slate-700 dark:text-slate-300"
                >
                    {tag}
                    <X width={16} className="ml-1 inline cursor-pointer" onClick={() => removeTag(index)} />
                </span>
            ))}

            {tags.length < 8 && (<input
                value={inputVal}
                onChange={keyPressHandler}
                type="text"
                placeholder="Add tag"
                className="bg-transparent inline w-min pl-1"
                list="suggested-tags"
            />)}
            <datalist id="suggested-tags">
                <option value="Technology">Technology</option>
                <option value="Project">Project</option>
                <option value="Coding">Coding</option>
                <option value="Electronics">Electronics</option>
                <option value="Blog">Blog</option>
            </datalist>
        </div>
    );
};

export default TagsInput;
