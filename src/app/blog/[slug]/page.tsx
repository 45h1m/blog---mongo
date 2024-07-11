import { compileContent } from "@/components/functions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlog, getBlogs } from "@/_actions/blogActions";
import PostComment from "@/components/PostComment";
import CommentCard from "@/components/CommentCard";
import SessionWrapper from "@/components/SessionWrapper";

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
    const { blogs }: any = await getBlogs();

    return blogs.map((blog: any) => blog.slug);
}

const page = async (props: any) => {
    const slugInURL = props.params.slug;

    let blog: any = null;
    let compiledContent = null;

    try {
        blog = await getBlog(slugInURL);
        compiledContent = await compileContent(blog.content);
    } catch (error) {
        console.log(error);
        notFound();
    }

    return (
        <>
            <div className="blog-container flex flex-col gap-4 p-2 sm:px-4 sm:border rounded-lg sm:shadow-sm sm:bg-slate-50 dark:sm:bg-slate-900 py-4 break-words">
                <h1 className="font-bold text-3xl border-l-4 border-red-600 pl-2">{blog.title}</h1>
                {compiledContent}
            </div>
            <hr className="my-5" />
            <div className="p-2 pt-0">
                <SessionWrapper>
                    <PostComment />
                </SessionWrapper>

                <ul className="pt-6 flex flex-col gap-3">
                    <li>
                        <CommentCard author={"Ashim"} authorDP={""} date="12/12/2030" authenticated={true} owner={true} comment={""} />
                    </li>
                    <li>
                        <CommentCard
                            author={"Ashim"}
                            authorDP={"/admin-dp-small.gif"}
                            date="12/12/2030"
                            authenticated={true}
                            owner={true}
                            comment={
                                "Lorem, ipsum dolor sit amet consectetur elit. Consectetur architecto est porro quasi doloremque aut quisquam vero necessitatibus distinctio dignissimos?"
                            }
                        />
                    </li>
                    <li>
                        <CommentCard
                            author={"Bhopender Yogi"}
                            authorDP={"/admin-dp-small.gif"}
                            date="12/12/2030"
                            authenticated={true}
                            owner={true}
                            comment={"distinctio dignissimos?"}
                        />
                    </li>
                    <li>
                        <CommentCard
                            author={"John Doe"}
                            authorDP={"/admin-dp-small.gif"}
                            date="12/12/2030"
                            authenticated={true}
                            owner={true}
                            comment={"Dummy comment, working on serverside 😎"}
                        />
                    </li>
                </ul>
            </div>

            <hr className="md:hidden my-5" />
        </>
    );
};

export default page;
