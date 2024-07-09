"use client";
import NavBar from "@/components/NavBar";
import { Flame, Moon, SearchIcon, Sun, WindIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import Image from "next/image";
const Header = () => {
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setDark(document.documentElement.classList.contains("dark"));
    };

    useEffect(() => {
        setDark(document.documentElement.classList.contains("dark"));
    }, []);

    return (
        <header className="sticky top-0 backdrop-blur-lg z-10 bg-white/80 dark:bg-slate-950/60 shadow-sm">
            <div className="px-2 left flex items-center gap-4 sm:container h-20 sm:h-24">
                <Link href="/">
                    <div className="flex gap-2">
                        <div>
                            <Flame color="#ff0000" />
                        </div>
                        <h4 className="font-bold text-xl">Flamer</h4>
                    </div>
                </Link>

                <div className="pl-6 hidden lg:flex">
                    <NavBar />
                </div>

                <div className="flex w-full"></div>

                <Search />

                <button className="size-10" onClick={toggleTheme} aria-label="toggle-theme">
                    {dark ? <Sun color="#bbc8d3" /> : <Moon color="#465562" />}
                </button>

                <button
                    className="bg-red-600 text-white px-4 hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
                    title="Sign in to post comment"
                    aria-label="sign in"
                >
                    Sign In
                </button>

                {/* <div className="relative">
                    <Image
                        className="rounded-full ring-1 ring-slate-500/50"
                        width={100}
                        height={100}
                        src={"/admin-dp-small.gif"}
                        alt="Profile-picture"
                        title="View Profile"
                    />
                    <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div> */}
            </div>
        </header>
    );
};

export default Header;
