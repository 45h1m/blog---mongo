import Image from "next/image";
import { EllipsisVertical, MoveUpRight } from "lucide-react";
import CommentCard from "@/components/CommentCard";
import PostComment from "@/components/PostComment";

export default async function Home() {
    return (
        <div className="min-h-svh pt-20">
            <section>
                <div className="max-w-lg mx-auto">
                    <PostComment/>
                    <h3 className="text-lg text-slate-400">Comments</h3>


                    <ul className="pt-5 flex flex-col gap-4">
                        <li>
                            <CommentCard
                                author={"Ashim"}
                                authorDP={""}
                                date="12/12/2030"
                                authenticated={true}
                                owner={true}
                                comment={
                                    
                                    ''
                                }
                            />
                        </li>
                        <li>
                            <CommentCard
                                author={"Ashim"}
                                authorDP={"/admin-dp-small.gif"}
                                date="12/12/2030"
                                authenticated={true}
                                owner={true}
                                comment={
                                    
                                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur architecto est porro quasi doloremque aut quisquam vero necessitatibus distinctio dignissimos?"
                                }
                            />
                        </li>
                        <li>
                            <CommentCard
                                author={"Ashim"}
                                authorDP={"/admin-dp-small.gif"}
                                date="12/12/2030"
                                authenticated={true}
                                owner={true}
                                comment={
                                    
                                    "Lorem, ipsum est porro quasi doloremque aut quisquam vero necessitatibus distinctio dignissimos?"
                                }
                            />
                        </li>
                    </ul>
                </div>
            </section>

            <section>
                
            </section>

            <div className="pt-4 flex flex-col gap-3 items-center">
                <Image width={300} height={250} src="/building.gif" alt="webpage-is-building-animation" className="w-full max-w-sm rounded-lg" />

                <h1 className="text-3xl font-bold text-center pt-7">Hey.. I am learning NextJS.</h1>
            </div>
            <div className="flex flex-col pt-4 items-center justify-center">
                <h5 className="text-xl font-bold pt-5">still building this site 😉</h5>
                <a
                    href="/blog"
                    className="flex w-fit items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white font-semibold mt-2"
                >
                    View Blogs{" "}
                    <span className="pt-1">
                        <MoveUpRight size={18} />
                    </span>
                </a>
            </div>
        </div>
    );
}
