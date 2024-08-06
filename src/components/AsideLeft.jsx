import { getBlogs } from "@/_actions/blogActions";
import PostCardSmall from "@/components/PostCardSmall";
import { isoToIST } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";

const AsideLeft = async () => {
    let { blogs } = await getBlogs();

    const projects = blogs.filter((blog) => {
        let project = false;
        blog.tags.map((tag) => {
            if (tag.toLowerCase() === "project") return (project = true);
        });
        return project && blog.published;
    });

    return (
        <aside className="md:pt-4 md:pr-3 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sticky top-0 md:pt-20">
                <h3 className="font-bold text-xl p-4">Our Projects 👀</h3>
                <ul className="flex flex-col gap-3">
                    {projects.map((project) => (
                        <li key={project.slug} className="max-w-md">
                            <PostCardSmall
                                title={project.title}
                                description={project.description}
                                date={isoToIST(project.createdAt)}
                                slug={project.slug}
                            />
                        </li>
                    ))}
                </ul>
                <a
                    href="/blog"
                    className="self-start mx-auto text-md shadow-lg flex h-min w-fit items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-400 rounded-lg text-white text-sm font-semibold mt-2"
                >
                    View Blogs{""}
                    <span>
                        <MoveUpRight size={20} />
                    </span>
                </a>
            </div>
        </aside>
    );
};

export default AsideLeft;
