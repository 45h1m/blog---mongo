import { getBlogs } from "@/_actions/blogActions";
import PendingBlog from "@/components/PendingBlog";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session:any = await getServerSession(authOptions);
    if (session?.role !== "admin") {
        redirect("/blog");
    }

    const { blogs } = await getBlogs();

    const pendingBlogs = blogs!.filter(blog => blog.published === false);

    return <div>

        {pendingBlogs.length === 0 && (<p>No pending blogs 😴</p>)}

        {pendingBlogs?.map(b => (
            <PendingBlog key={b.slug} title={b.title} slug={b.slug} email={b.email} id={b._id.toString()}/>
        ))}

    </div>;
};

export default page;
