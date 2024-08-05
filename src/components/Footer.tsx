"use client";
import { Flame } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
    const { toast } = useToast();

    return (
        <footer className="w-full pt-20 md:container sm:px-4">
            <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
                <div className="w-full px-4 md:w-1/2 lg:px-0">
                    <h1 className="max-w-sm text-3xl font-bold">Subscribe to our Newsletter</h1>
                    <form action="" className="mt-4 inline-flex w-full items-center md:w-3/4">
                        <input
                            className="flex h-10 w-full rounded-md border-2  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                        />
                        <button
                            aria-label="Subscribe Newsletter"
                            type="button"
                            className="ml-4 rounded-full bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => {
                                toast({
                                    title: "Newsletter will be available soon",
                                    description: "Working on it",
                                });
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
                    <div className="mb-8 lg:mb-0">
                        <p className="mb-6 text-lg font-semibold text-slate-700 dark:text-slate-400">FireBit</p>
                        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-slate-600 dark:text-slate-500">
                            <li>hello@flamer.com</li>
                            <li>+91 1234567890</li>
                            <li>Facebook</li>
                            <li>Github</li>
                            <li>YouTube</li>
                        </ul>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <p className="mb-6 text-lg font-semibold text-slate-700 dark:text-slate-400">Developer</p>
                        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-slate-600 dark:text-slate-500">
                            <li>github/45h1m</li>
                            <li>Company History</li>
                            <li>Our Team</li>
                            <li>Our Vision</li>
                            <li>Press Release</li>
                        </ul>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <p className="mb-6 text-lg font-semibold text-slate-700 dark:text-slate-400">Team</p>
                        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-slate-600 dark:text-slate-500">
                            <li>About us</li>
                            <li>Company History</li>
                            <li>Our Team</li>
                            <li>Our Vision</li>
                            <li>Press Release</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="pb-4 mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
                <div className="flex items-center gap-2 justify-center">
                    <img
                        className="invert -hue-rotate-180 dark:hue-rotate-0 dark:invert-0 w-24"
                        src={"/firebit.svg"}
                        width={200}
                        height={160}
                        alt="firebit-logo"
                    />
                </div>
                <div className="pt-4 md:pt-0 flex justify-center">
                    <p className="text-sm font-medium text-gray-600 ">© 2024 FIREBIT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
