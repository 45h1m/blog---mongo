"use client";
import { signIn, useSession } from "next-auth/react";
import CommentCard from "./CommentCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { LoaderCircle, Send } from "lucide-react";
import { useToast } from "./ui/use-toast";

const CommentSection = ({ blogID }: any) => {
    let session = useSession();
    const textarea = useRef<HTMLTextAreaElement | null>(null);
    const [comments, setComments] = useState([]);
    const [posting, setPosting] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { toast } = useToast();

    async function postCommentRequest() {
        const content = textarea?.current?.value!;

        if (!content) return;

        setPosting(true);

        try {
            const response = await axios.post("/api/postcomment", { blogID, content });
            console.log(response.data);
            if (response.data.error) {
                toast({
                    title: "Something went wrong.",
                    description: "Can't post comments.",
                });
            } else {
                toast({
                    title: "Comment posted.",
                    description: "Your comment was posted.",
                });
                getComments(blogID);
            }
        } catch (error) {
            toast({
                title: "Something went wrong.",
                description: "Can't post comments.",
            });
            console.error("Error posting comment: ", error);
        }

        setPosting(false);
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

    useEffect(() => {
        getComments(blogID);
    }, []);

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
                    />
                    <button
                        title="Post a comment"
                        aria-label="Subscribe Newsletter"
                        type="button"
                        className="self-start ml-4 rounded-full bg-red-600 px-3 w-10 h-10 aspect-square text-sm font-semibold text-white shadow-sm hover:bg-red-600/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={postCommentRequest}
                    >
                        {posting ? <LoaderCircle width={20} className="animate-spin ml-[-2px]" /> : <Send width={20} className="ml-[-3px] mb-[-4px]" />}
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
            <div className="p-2 pt-0">
                <ul className="pt-6 flex flex-col gap-3">
                    {comments.length > 0
                        ? comments.map((c: any) => (
                              <li key={c._id}>
                                  <CommentCard
                                      author={c.name}
                                      authorDP={c.dp}
                                      date={c.createdAt.toString()}
                                      authenticated={session.status === "authenticated"}
                                      owner={session?.data?.user?.image! === c.dp}
                                      comment={c.content}
                                  />
                              </li>
                          ))
                        : <p>Be the first to comment 🤩</p>} {fetching && <LoaderCircle width={20} className="animate-spin ml-[-2px]" />}
                </ul>
            </div>
        </>
    );
};

export default CommentSection;
