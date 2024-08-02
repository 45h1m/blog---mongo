"use client"
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const ValidateAll = () => {
    const [revalidating, setRevalidating] = useState(false);
    const revalidateAll = async (path = "allslugs") => {
        try {
            setRevalidating(true);

            const response = await axios.post(`/api/revalidate`, { path });

            if (response.data.error) {
                console.log(response.data.error);
                alert(response.data.error);
            }
            if (response.data.success) {
                console.log(response.data.success);
                alert(response.data.success);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }

        setRevalidating(false);
    };

    return (
        <button className="self-end border-2 px-4 rounded-lg border-green-600 py-2" onClick={() => revalidateAll()}>
            {!revalidating ? "Revalidate All" : <LoaderCircle width={20} className="animate-spin ml-[-2px]" />}
        </button>
    );
};

export default ValidateAll;
