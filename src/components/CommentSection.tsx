"use client";
import { signIn, useSession } from "next-auth/react";
import CommentCard from "./CommentCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { LoaderCircle, Send } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { isoToIST } from "@/lib/utils";

const CommentSection = ({ blogID }: any) => {
    
    const textarea = useRef<HTMLTextAreaElement | null>(null);
    const [comments, setComments] = useState([]);
    const [posting, setPosting] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [textValue, settextValue] = useState("");
    const { toast } = useToast();

    async function postCommentRequest() {
        const content = textValue;

        if (!content) return;

        setPosting(true);

        try {
            const response = await axios.post("/api/postcomment", { blogID, content });
            console.log(response.data);
            if (response.data.error) {
                toast({
                    title: "Can't post comment.",
                    description: response.data.error,
                });
            } else {
                toast({
                    title: response.data.data,
                    description: "Your comment was posted.",
                });
                getComments(blogID);
            }
        } catch (error:any) {
            toast({
                title: "Something went wrong.",
                description: "Can't post comment.",
            });
            console.error("Error posting comment: ", error);
        }

        settextValue("");
        setPosting(false);
    }

    async function deleteComment(commentID: string) {
        try {
            const response = await axios.post("/api/deletecomment", { blogID, commentID });
            console.log(response.data);
            if (response.data.error) {
                toast({
                    title: "Something went wrong.",
                    description: "Can't delete comment.",
                });
            } else {
                toast({
                    title: response.data.data,
                    description: "Your comment was deleted.",
                });
                getComments(blogID);
            }
        } catch (error) {
            toast({
                title: "Something went wrong.",
                description: "Can't delete comment.",
            });
            console.error("Error deleting comment: ", error);
        }
    }

    async function getComments(blogID: string) {
        try {
            const response = await axios.post("/api/getcomments", { blogID });

            if (response.data.error) {
                toast({
                    title: "Something went wrong.",
                    description: "Can't fetch comment.",
                });
            } else {
                setComments(response.data);
            }
        } catch (error) {
            toast({
                title: "Something went wrong.",
                description: "Can't fetch comment.",
            });
            console.error("Error posting comment: ", error);
            return { error: "failed getting comment" };
        }

        
        setFetching(false);
    }

    let session = useSession();
    
    useEffect(() => {
        
        getComments(blogID);

    }, [session, session.status]);
    
    return (
        <>
            {session.status === "authenticated" ? (
                <div className="bg-slate-50 dark:bg-slate-800 flex items-center p-2 rounded-lg w-full shadow-sm border-2 ">
                    <Image
                        width={100}
                        height={100}
                        className="mr-2 antialiased rounded-full size-10 self-start"
                        src={session.data.user?.image!}
                        alt="user-profile-picture"
                    />
                    <TextareaAutosize
                        ref={textarea}
                        placeholder="Write comment"
                        className="bg-transparent outline-slate-500 w-full p-2 border-none shadow-none"
                        value={textValue}
                        onChange={(e) => settextValue(e.target.value)}
                    />
                    <button
                        title="Post a comment"
                        aria-label="Subscribe Newsletter"
                        type="button"
                        className="self-start ml-4 rounded-full bg-red-600 px-3 w-10 h-10 aspect-square text-sm font-semibold text-white shadow-sm hover:bg-red-600/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={postCommentRequest}
                    >
                        {posting ? (
                            <LoaderCircle width={20} className="animate-spin ml-[-2px]" />
                        ) : (
                            <Send width={20} className="ml-[-3px] mb-[-4px]" />
                        )}
                    </button>
                </div>
            ) : session.status === "unauthenticated" && (
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
            <div className="p-2 pt-0">
                <ul className="pt-6 flex flex-col gap-3">
                    {comments.length > 0 ? (
                        comments.map((c: any) => (
                            <li key={c._id}>
                                <CommentCard
                                    _id={c._id}
                                    author={c.name}
                                    authorDP={c.dp}
                                    date={isoToIST(c.createdAt)}
                                    authenticated={session.status === "authenticated"}
                                    owner={
                                        session?.data?.user?.image! === c.dp ||
                                        session?.data?.user?.image! ===
                                            "https://lh3.googleusercontent.com/a/ACg8ocL3TXdHv7ItmCaQwNqyRkY5iyiIsAyvkcPRVIapBmuxt_eYN2zL=s96-c"
                                    }
                                    comment={c.content}
                                    ondelete={deleteComment}
                                />
                            </li>
                        ))
                    ) : fetching ? (
                        <div className="flex gap-2 items-center"><LoaderCircle width={20} className="animate-spin ml-[-2px]" />Loading comments </div>
                    ) : (
                        <p>Be the first to comment 🤩</p>
                    )}
                </ul>
            </div>
        </>
    )
};


export default CommentSection;
