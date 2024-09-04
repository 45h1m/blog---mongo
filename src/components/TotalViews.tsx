"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const TotalViews = ({slug}:any) => {

    const [state, setState] = useState("Loading...");

    useEffect(() => {
        axios.post("/api/getBlogBySlug", {slug}).then(response => {
            if(response.data.error) {
                setState("error");
            }
            if(response.data.blog) {
                setState(response.data.blog.views +" views");
            }
        })
    })

    return <span className={`py-1 px-2 border rounded-full ml-1 ${state === 'error'? 'hidden':''}`}>{state}</span>;
};

export default TotalViews;
