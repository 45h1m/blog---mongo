"use client"
import axios from "axios";

const PendingBlog = ({id, title, email, slug}:any) => {
    const approveBlog = async (id: string, slug: string) => {
        try {
            const response = await axios.post("/api/approveblog", { id, slug });

            if (response.data.success) {
                console.log(response.data.success);
                alert(response.data.success);
            }

            if (response.data.error) {
                console.log(response.data.error);
                alert(response.data.error);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return <div className="flex gap-4 border-2 p-3">
        <p className="p-2 bg">{id}</p>
        <p className="p-2">{title}</p>
        <p className="p-2">{email}</p>
        <p className="p-2">{slug}</p>
        <button className="border-2 px-4 rounded-lg" onClick={() => approveBlog(id, slug)}>Approve</button>
    </div>;
};

export default PendingBlog;
