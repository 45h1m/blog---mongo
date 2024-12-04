import { getBlogs } from "@/_actions/blogActions";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";
import { isoToIST } from "@/lib/utils";


export async function generateMetadata(props: any): Promise<Metadata> {

    return {
        title: "Blogs",
        description: "Explore Tech Blogs & Projects",
        openGraph: {
            images: [{ url: '/flamer-og.webp'}],
        },
    };
}


const page = async () => {
    const {blogs } = await getBlogs();

    const publishedBlogs = blogs?.filter(blog => blog.published);

    publishedBlogs?.sort((a, b) => b.views - a.views);

    return (
        <div className="flex flex-col gap-3 md:pl-0 pb-10">
            {
                <div className="flex flex-col gap-3 pt-4">
                    {publishedBlogs?.map((blog:any, index) => (
                        <article className="" key={blog.slug}>
                            <PostCard 
                            title={blog.title} 
                            description={blog.description} 
                            slug={blog.slug} 
                            date={isoToIST(blog.createdAt)} 
                            author={blog.author} 
                            dp={blog.authorDP}
                            thumbnail={blog.thumbnail}
                            tags={blog.tags}/>
                        </article>
                    ))}
                </div>
            }
        </div>
    );
};

export default page;
