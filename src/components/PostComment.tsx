"use client";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "./ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const PostComment = () => {
    let session = useSession();

    return (
        <>
            {session.status === "authenticated" ? (
                <div className="bg-slate-50 dark:bg-slate-800 flex items-center p-2 rounded-lg w-full shadow-sm border-2 ">
                    <Image width={100} height={100} className="mr-2 antialiased rounded-full size-10 self-start" src={session.data.user?.image!} alt="user-profile-picture" />
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
            ) : (
                <div className="flex items-center gap-4 pt-2">
                    <button
                        className="bg-red-600 font-semibold  text-white px-4 hover:bg-red-500 py-2 rounded-lg shadow-sm"
                        title="Sign in to post comment"
                        aria-label="sign in"
                        onClick={() => signIn("google")}
                    >
                        Sign In
                    </button>
                    <p className="text-slate-600 dark:text-slate-400">To post a comment</p>
                </div>
            )}
        </>
    );
};

export default PostComment;
