"use client";
import NavBar from "@/components/NavBar";
import { EllipsisVertical, Flame, LoaderCircle, Moon, SearchIcon, Sun, WindIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const Header = () => {
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setDark(document.documentElement.classList.contains("dark"));
    };

    let session = useSession();

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        
        function applyTheme() {
            if (prefersDarkScheme.matches) {
                document.documentElement.classList.add("dark");
                setDark(true);
            } else {
                document.documentElement.classList.remove("dark");
                setDark(false);
            }
        }
        applyTheme();

        const themeListener = prefersDarkScheme.addEventListener("change", applyTheme);

    }, []);

    return (
        <header className="sticky top-0 backdrop-blur-lg z-20 bg-white/80 dark:bg-slate-950/60 shadow-sm">
            <div className="px-2 left flex items-center gap-4 sm:container h-20 sm:h-24 justify-between">
                <div className="flex items-center">
                    <Link href="/">
                        <div className="flex gap-2">
                            <div>
                                <Flame color="#ff0000" />
                            </div>
                            <h4 className="font-bold text-xl">FireBit</h4>
                        </div>
                    </Link>

                    <div className="pl-6 hidden lg:flex">
                        <NavBar />
                    </div>
                </div>

                <div className="flex gap-2 w-full justify-end items-center">
                    <Search />

                    <button className="size-10 flex items-center justify-center" onClick={toggleTheme} aria-label="toggle-theme">
                        {dark ? <Sun color="#bbc8d3" /> : <Moon color="#465562" />}
                    </button>

                    {session.status === "authenticated" && (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger aria-label="option-menu">
                                    <div className="size-10 aspect-square flex items-center">
                                        <Image
                                            className="rounded-full ring-2 ring-red-600"
                                            title={session.data.user?.name!}
                                            width={100}
                                            height={100}
                                            alt={session.data.user?.name! + "-profile-picture"}
                                            src={session?.data?.user?.image!}
                                        />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="p-2 drop-shadow-sm">
                                    <DropdownMenuItem>
                                        <button
                                            className="bg-red-600 text-white px-4 font-semibold hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
                                            title="Sign in to post comment"
                                            aria-label="sign in"
                                            onClick={() => signOut()}
                                        >
                                            Sign Out
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}

                    {session.status === "loading" && (
                        <div className="size-10 aspect-square flex items-center">
                            <LoaderCircle className="animate-spin" />
                        </div>
                    )}

                    {session.status === "unauthenticated" && (
                        <button
                            className="bg-red-600 text-white px-4 font-semibold hover:bg-red-500 py-2 rounded-lg shadow-sm text-nowrap"
                            title="Sign in to post comment"
                            aria-label="sign in"
                            onClick={() => signIn("google")}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
