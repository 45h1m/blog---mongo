import { getBlogs } from "@/_actions/blogActions";
import PostCardSmall from "@/components/PostCardSmall";


const AsideLeft = async () => {
    let {blogs} = await getBlogs();

    const projects = blogs.filter(blog => {
        let project = false;
        blog.tags.map(tag => { 
            if (tag.toLowerCase() === 'project') return project = true;
        });
        return project;
    });

    return (
        <aside className="md:pt-4 md:pr-3 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sticky top-0 md:pt-20">
                <h3 className="font-bold text-xl p-4 text-slate-700 dark:text-slate-400">Our Projects</h3>
                <ul className="flex flex-col gap-3">
                    {projects.map(project => <li key={project.slug} className="max-w-md"><PostCardSmall title={project.title} description={project.description} date={project.createdAt.toString().split("GMT")[0]} slug={project.slug} /></li>)}
                </ul>
            </div>
        </aside>
    );
};

export default AsideLeft;
