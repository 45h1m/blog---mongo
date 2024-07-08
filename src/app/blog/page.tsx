import { getBlogs } from "@/_actions/blogActions";
import PostCard from "@/components/PostCard";

const page = async () => {
    const {blogs } = await getBlogs();

    return (
        <div className="blog-container flex flex-col gap-4 p-2 prose">
            {
                <div className="flex flex-col gap-4 pt-4">
                    {blogs?.map((blog:any, index) => (
                        <article className="" key={blog.slug}>
                            <PostCard 
                            title={blog.title} 
                            description={blog.description} 
                            slug={blog.slug} 
                            date={blog.createdAt.toString().split("GMT")[0]} 
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
