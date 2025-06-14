"use client";
import NavBar from "@/components/NavBar";
import { EllipsisVertical, Flame, LoaderCircle, Moon, SearchIcon, Sparkle, Sun, WindIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import SigninButton from "./SigninButton";

const Header = () => {
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setDark(document.documentElement.classList.contains("dark"));
    };

    let session: any = useSession();

    const pathname = usePathname();

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
            <div className="px-3 left flex items-center gap-4 sm:container h-20 sm:h-24 justify-between">
                <div className="flex items-center">
                    <Link href="/blog">
                        <div className="flex gap-2">
                            <div className="w-24">
                                <img className="invert -hue-rotate-180 dark:hue-rotate-0 dark:invert-0" src={"/firebit.svg"} width={200} height={160} alt="firebit-logo"/>
                            </div>
                            
                        </div>
                    </Link>

                    <div className="pl-6 hidden lg:flex">
                        <NavBar />
                    </div>
                </div>

                <div className="flex gap-2 w-full justify-end items-center">
                    {session.status === "authenticated" && pathname !== "/create" && (
                        <a href="/create" aria-label="navigate-to-create-blog" title="Create new">
                            <button
                                className="rainbow-animate flex justify-center items-center gap-2 rounded-full md:border-2 dark:border-slate-700 border-slate-200 py-2 md:pr-4 md:pl-3 size-10 md:size-auto"
                                aria-label="Search Posts"
                            >
                                <Sparkle />
                                <span className="md:block hidden">Create</span>
                            </button>
                        </a>
                    )}

                    {session?.data?.role === "admin" && (
                        <a className="text-lg" href="/heaven">
                            💀
                        </a>
                    )}
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
                        <SigninButton />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
