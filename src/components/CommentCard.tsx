import { ArrowsUpFromLine, EllipsisVertical, MoveUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

type CommentCardProps = {
    _id: string;
    author: string;
    date: string;
    authorDP: string;
    authenticated: Boolean;
    owner: Boolean;
    comment: string;
    ondelete?: Function;
    onreport?: Function;
    onpublish?: Function;
    pro?:Boolean,
    published: Boolean
};

const CommentCard = ({ _id, author, authorDP, date, authenticated, owner, comment, ondelete, onreport, pro, published, onpublish = () => {} }: CommentCardProps) => {
    return (
        <article>
            <div className="profile flex justify-start gap-2">
                <div className="pt-1 relative">
                    {pro && (<span className="absolute -top-1 -right-3">⭐</span>)}
                    <Image className="antialiased rounded-full ring-1" width={30} height={30} src={authorDP || "/flamer.png"} alt={"author-" + author || "author" + "-profile-image"} />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 dark:text-slate-100 p-2 px-3 rounded-lg w-fit shadow-sm max-w-full">
                    <div className="flex justify-between items-center">
                        <div className="left flex items-center gap-2">
                            <div className="">
                                <h4 className="font-bold text-sm">{author || "Author"}</h4>
                                <dl>
                                    <dt className="hidden">Published on</dt>
                                    <dd>
                                        <p className="text-xs text-slate-500">{date || "12/12/2049"}</p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="right">
                            <DropdownMenu>
                                <DropdownMenuTrigger aria-label="option-menu">
                                    <EllipsisVertical width={20}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {!authenticated && <DropdownMenuItem>Sign In</DropdownMenuItem>}
                                    {authenticated && <DropdownMenuItem onClick={() => onreport?.()}>Report</DropdownMenuItem>}
                                    {authenticated && owner && <DropdownMenuItem onClick={() => ondelete?.(_id)}>Delete</DropdownMenuItem>}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="content mt-2 w-full break-words">
                        <p className="">{comment || "Wondering how a comment can be empty 🤔"}</p>
                    </div>
                </div>
            {!published && (<button onClick={() => onpublish?.(_id)}><ArrowsUpFromLine /></button>)}
            </div>
        </article>
    );
};

export default CommentCard;
