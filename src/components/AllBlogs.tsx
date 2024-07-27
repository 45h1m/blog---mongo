"use client";
import axios from "axios";

const AllBlogs = ({ id, title, author, slug, published }: any) => {
    const blogOperation = async (id: string, slug: string, operation: string) => {
        try {
            const response = await axios.post(`/api/${operation}blog`, { id, slug });

            if (response.data.success) {
                console.log(response.data.success);
                // alert(response.data.success);
                const input = prompt(response.data.success, "reload");
                if(input === "reload") location.reload();
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

    return (
        <>
            <td className="p-4 bg">{id}</td>
            <td className="p-4">{title}</td>
            <td className="p-4">{author}</td>
            <td className="p-4">{slug}</td>
            <td className="p-4">
                <div className="flex gap-2">
                    {!published && (
                        <button className="self-end border-2 px-4 rounded-lg border-blue-600 py-2" onClick={() => blogOperation(id, slug, "approve")}>
                            Approve
                        </button>
                    )}
                    <button className="self-end border-2 px-4 rounded-lg border-red-600 py-2" onClick={() => blogOperation(id, slug, "delete")}>
                        Delete
                    </button>
                </div>
            </td>
        </>
    );
};

export default AllBlogs;
