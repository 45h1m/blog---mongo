"use client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const AllBlogs = ({ id, title, author, slug, published }: any) => {
    const [revalidating, setRevalidating] = useState(false);
    const blogOperation = async (id: string, slug: string, operation: string) => {
        try {
            const response = await axios.post(`/api/${operation}blog`, { id, slug });

            if (response.data.success) {
                console.log(response.data.success);
                // alert(response.data.success);
                const input = prompt(response.data.success, "reload");
                if (input === "reload") location.reload();
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

    const revalidate = async (path:string) => {
        try {
            setRevalidating(true);

            const response = await axios.post(`/api/revalidate`, { path });
            
            if(response.data.error) {
                console.log(response.data.error);
                alert(response.data.error);
            }
            if(response.data.success) {
                console.log(response.data.success);
                alert(response.data.success);
            }

        } catch (error) {
            console.log(error);
            alert(error);
        }

        setRevalidating(false);
    }

    return (
        <>
            <td className="p-4 bg">{id}</td>
            <td className="p-4">{title}</td>
            <td className="p-4">{author}</td>
            <td className="p-4">{slug}</td>
            <td className="p-4">
                <div className="flex gap-2">
                    {!published ? (
                        <button className="self-end border-2 px-4 rounded-lg border-blue-600 py-2" onClick={() => blogOperation(id, slug, "approve")}>
                            Approve
                        </button>
                    ) : (
                        <button className="self-end border-2 px-4 rounded-lg border-red-600 py-2" onClick={() => blogOperation(id, slug, "delete")}>
                            Delete
                        </button>
                    )}
                    <button className="self-end border-2 px-4 rounded-lg border-green-600 py-2" onClick={() => revalidate(`/blog/${slug}`)}>
                        {!revalidating ? "Revalidate" : <LoaderCircle width={20} className="animate-spin ml-[-2px]" />}
                    </button>
                </div>
            </td>
        </>
    );
};

export default AllBlogs;
