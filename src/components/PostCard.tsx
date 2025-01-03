import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Span } from "next/dist/trace";
import Share from "./Share";

interface postCardProps {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    dp: string;
    thumbnail: string;
    tags: Array<string>;
}

const PostCard = ({ slug, title, description, date, author, thumbnail, dp, tags }: postCardProps) => {
    return (
        <div className="max-w-2xl bg-slate-50 dark:bg-slate-950/50 sm:dark:bg-slate-900 rounded-lg sm:border shadow-sm overflow-hidden">
            <div className="p-3 flex justify-between items-center">
                <div className="left flex gap-3 items-center">
                    <Avatar className="ring-1">
                        <AvatarImage src={dp} alt={"author-" + author + "-profile-image"} />
                        <AvatarFallback>{author.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="font-semibold">{author}</p>
                        <dl>
                            <dt className="hidden">Published on</dt>
                            <dd>
                                <p className="text-xs text-slate-500">{date}</p>
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className="right grid">
                    <DropdownMenu>
                        <DropdownMenuTrigger aria-label="option-menu">
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Share url={"https://firebit.in/blog/" + slug} title={title} description={description} />
                            </DropdownMenuItem>
                            <DropdownMenuItem>Report</DropdownMenuItem>
                            <DropdownMenuItem>Block</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="lg:grid grid-cols-2">
                <div className="focus-content p-4 pt-0">
                    <Link className="no-underline" href={"blog/" + slug} title={title}>
                        <h2 className="text-slate-800 dark:text-slate-200 text-2xl font-bold py-2 hover:no-underline capitalize">{title}</h2>
                        <p className="text-slate-700 dark:text-slate-300 line-clamp-4 py-1">{description} </p>
                        read more
                    </Link>
                </div>
                <div className="lg:pr-4 lg:pb-4 rounded-lg overflow-hidden group ">
                    <Link href={"blog/" + slug} className=" w-full h-full flex relative items-end">
                        <Image
                            width={400}
                            height={400}
                            src={thumbnail}
                            alt="post-thumbnail"
                            className="object-cover w-full h-full lg:max-h-full rounded-lg aspect-video"
                        />
                        <div className="opacity-0 group-hover:opacity-100 transition absolute flex flex-wrap-reverse gap-1 bg-gradient-to-t rounded-lg dark:from-slate-500/20 from-black/20 to-transparent p-1 items-end justify-start w-full">
                            {tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-white/90 dark:bg-black/60 text-black dark:text-slate-100 px-2 rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
