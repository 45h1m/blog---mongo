import { getBlogs } from "@/_actions/blogActions";
import AllBlogs from "@/components/AllBlogs";
import ValidateAll from "@/components/ValidateAll";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useState } from "react";

const page = async () => {
    const session: any = await getServerSession(authOptions);
    if (session?.role !== "admin") {
        redirect("/blog");
    }

    const { blogs } = await getBlogs();

    return (
        <div>
            {blogs?.length === 0 && <p>No pending blogs 😴</p>}

            <div className="w-full overflow-x-auto p-4">
            <ValidateAll/>
                <table className="min-w-[60rem]">
                    <thead className="top-10">
                        <tr>
                            <th>_id</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs?.map((b) => (
                            <tr key={b.slug} className="border-b-2">
                                <AllBlogs title={b.title} slug={b.slug} author={b.author} id={b._id.toString()} published={b.published} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;
