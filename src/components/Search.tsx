"use client";

import * as React from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Flame, SearchIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";

interface Blog {
    realSlug: string;
    title: string;
    tags: string[];
}

export default function Search() {
    const [open, setOpen] = React.useState(false);
    const [blogs, setBlogs] = React.useState<Blog[]>([]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);

        fetch("/api/allblogs", { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);

            });

        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <div className="right flex gap-4 items-center w-full justify-end" onClick={() => setOpen((prev) => !prev)}>
                <button className="flex items-center rounded-full sm:border-2 py-2 sm:pl-4 sm:pr-2" aria-label="Search Posts">
                    <span className="text-slate-400 text-sm hidden sm:flex sm:min-w-[11rem]">Search posts</span>
                    <span className="logo">
                        <SearchIcon color="#ff0000" />
                    </span>
                </button>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen} aria-describedby={"search-bar"}>
                <DialogTitle className="p-4 font-bold text-slate-400">Flamer</DialogTitle>
                <CommandInput placeholder="search..." />
                <CommandList aria-describedby="list-of-all-blogs-and-projects">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup aria-describedby="list-of-all-blogs">
                        {blogs.map((b) => (
                            <Link key={b.realSlug} onClick={() => setOpen(false)} className="cursor-pointer" href={"/blog/" + b.realSlug}>
                                <CommandItem key={b.realSlug} aria-describedby={b.title}>
                                    <span>{b.title}</span>
                                    <span className="hidden">{b.tags.toString()}</span>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
