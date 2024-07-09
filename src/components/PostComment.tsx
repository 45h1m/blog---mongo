"use client";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "./ui/use-toast";

const PostComment = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center p-2 rounded-lg w-full shadow-sm">
            <TextareaAutosize placeholder="Write comment" className="bg-transparent outline-slate-500 w-full p-2 border-none shadow-none" />
            <button
                title="Post a comment"
                aria-label="Subscribe Newsletter"
                type="button"
                className="self-start ml-4 rounded-full bg-red-600 px-3 w-10 aspect-square text-sm font-semibold text-white shadow-sm hover:bg-red-600/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                    toast({
                        title: "Be patient my friend 😦",
                        description: "Working on it",
                    });
                }}
            >
                <Send width={20} className="ml-[-3px] mb-[-4px]" />
            </button>
        </div>
    );
};

export default PostComment;
