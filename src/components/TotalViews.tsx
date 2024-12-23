"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const TotalViews = ({ slug }: { slug: string }) => {
    const [state, setState] = useState<string>("Loading...");

    useEffect(() => {

        const fetchBlogViews = async () => {
            try {
                const response = await axios.post("/api/getBlogBySlug", { slug });
                if (response.data.blog) {
                    setState(`${response.data.blog.views} views`);
                } else {
                    setState("Error fetching views");
                }
            } catch (error) {
                console.error("Error fetching blog views:", error);
                setState("Error fetching views");
            }
        };

        fetchBlogViews();
    }, [slug]);

    if (state === "Error fetching views") {
        return null; 
    }

    return <span className="py-1 px-2 border rounded-full ml-1">{state}</span>;
};

export default TotalViews;
