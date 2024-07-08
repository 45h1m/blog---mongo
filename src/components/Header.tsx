"use client";
import NavBar from "@/components/NavBar";
import { Flame, Moon, SearchIcon, Sun, WindIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
const Header = () => {

    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark")
        setDark(document.documentElement.classList.contains("dark"))
    };

    useEffect(() => {

        setDark(document.documentElement.classList.contains("dark"))


    },[])


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

                <div className="pl-6 hidden md:flex">
                    <NavBar />
                </div>

                <div className="flex w-full"></div>

                <Search />

                <button className="size-10 pr-3" onClick={toggleTheme} aria-label="toggle-theme">
                    {dark? <Sun color="#bbc8d3" /> : <Moon color="#465562" />}
                    
                </button>

            </div>
        </header>
    );
};

export default Header;
