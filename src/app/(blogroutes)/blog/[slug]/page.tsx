import { compileContent } from "@/components/functions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlog, getBlogs } from "@/_actions/blogActions";
import CommentSection from "@/components/CommentSection";
import { generateAMPs } from "@/lib/generateStaticHTML";
import ProfileCard from "@/components/ProfileCard";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isoToIST } from "@/lib/utils";
import Share from "@/components/Share";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ReadAloud from "@/components/ReadAloud";

export async function generateMetadata(props: any): Promise<Metadata> {
    const slugInURL = props.params.slug;

    let blog = {
        title: "404 - Not found",
        description: "Page was not found",
        thumbnail: "",
    };

    try {
        blog = await getBlog(slugInURL);
    } catch (error) {
        console.log(error);
        return notFound();
    }

    if (!blog)
        return {
            title: "404 Not Found",
            description: "The page was not found",
        };

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            images: [{ url: blog.thumbnail }],
        },
    };
}

export async function generateStaticParams(props: any) {
    await generateAMPs();

    const { blogs }: any = await getBlogs();

    const publishedBlogs = blogs.filter((blog: any) => blog.published);

    return publishedBlogs.map((blog: any) => blog.slug);
}

const page = async (props: any) => {
    const slugInURL = props.params.slug;

    let blog: any = null;
    let compiledContent = null;
    let blogID = "";

    try {
        blog = await getBlog(slugInURL);
        if (!blog.published) return notFound();
        compiledContent = await compileContent(blog.content);
        blogID = blog._id.toString();
    } catch (error) {
        console.log("Error rendering /blog/[slug]: " + error);
        notFound();
    }

    return (
        <>
            <div className="blog-container flex flex-col gap-4 p-2 sm:px-4 sm:border rounded-lg sm:shadow-sm sm:bg-slate-50 dark:sm:bg-slate-900 py-4 break-words">
                <div className="p-3 px-2 flex justify-between items-center">
                    <div className="left flex gap-3 items-center">
                        <Avatar className="ring-1">
                            <AvatarImage src={blog.authorDP} alt={"author-" + blog.author + "-profile-image"} />
                            <AvatarFallback>{blog.author.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="font-semibold">{blog.author}</p>
                            <dl>
                                <dt className="hidden">Published on</dt>
                                <dd>
                                    <p className="text-sm text-slate-500">{isoToIST(blog.createdAt)}</p>
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
                                    <Share url={"https://firebit.in/blog/" + blog.slug} title={blog.title + " - FIREBIT"} description={blog.description} />
                                </DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                                <DropdownMenuItem>Block</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <h1 className="font-bold text-3xl border-l-4 border-red-600 pl-2 capitalize">{blog.title}</h1>
                {/* {compiledContent} */}
                <ReadAloud >{<>{compiledContent}</>}</ReadAloud>
            </div>
            <hr className="my-5" />
            <CommentSection blogID={blogID} />

            {
                blog.tags.some((tag:string) => tag.toLowerCase() === "project") && <>
                    <h4 className="p-4 pt-8 text-lg font-bold">Team ⚡</h4>
                    <div className="flex flex-wrap gap-3 p-3 justify-center sm:justify-start md:pl-0">
                        <ProfileCard
                            name={"Samrat Sarkar"}
                            designation={"Electronics Engineer"}
                            dp={"/sam-dp.webp"}
                            youtube={"https://www.youtube.com/@TechMyo"}
                            insta={"https://instagram.com/techmyo_official"}
                            email={"Samratsarkar769@gmail.com"}
                        />
                        <ProfileCard
                            name={"Ashim Das"}
                            designation={"Computer Engineer"}
                            dp={"/admin-dp-small.gif"}
                            youtube={"https://www.youtube.com/adymaza"}
                            insta={"https://instagram.com/i_can_print_hello_world"}
                            email={"ady.ashim@gmail.com"}
                            github={"https://github.com/45h1m"}
                        />
                    </div>
                </>
            }

            <hr className="md:hidden my-5" />
        </>
    );
};

export default page;
