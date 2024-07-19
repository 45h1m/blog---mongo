import { Github, Instagram, Mail, Youtube } from "lucide-react";
import Image from "next/image";

const ProfileCard = ({
    dp = "/admin-dp-small.gif",
    name = "Full Name",
    designation = "Designation",
    github,
    email = "ashim@gmail.com",
    insta = "/",
    youtube = "/"
}: any) => {
    return (
        <div className="relative flex flex-col justify-center max-w-xs p-6 shadow-lg rounded-xl sm:px-12 bg-slate-50 dark:bg-slate-800 dark:text-gray-800 w-full">
            {email === "ady.ashim@gmail.com" && <span className="absolute top-2 left-2 bg-red-100 w-fit text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Developer</span>}
            <Image width={300} height={300} src={dp} alt="" className="ring-2 ring-red-600 w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-xl text-slate-700 dark:text-slate-200">{name}</h2>
                    <p className="px-5 text-xs sm:text-base text-slate-500 dark:text-slate-400">{designation}</p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                    {github && <a
                        rel="noopener noreferrer"
                        href={github}
                        aria-label="GitHub"
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:dark:text-red-600 dark:bg-slate-800 transition-all hover:bg-slate-100"
                    >
                        <Github />
                    </a>}
                    <a
                        rel="noopener noreferrer"
                        href={youtube}
                        aria-label="Dribble"
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:dark:text-red-600 dark:bg-slate-800 transition-all hover:bg-slate-100"
                    >
                        <Youtube />
                    </a>
                    <a
                        rel="noopener noreferrer"
                        href={insta}
                        aria-label="Twitter"
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:dark:text-red-600 dark:bg-slate-800 transition-all hover:bg-slate-100"
                    >
                        <Instagram />
                    </a>
                    <a
                        rel="noopener noreferrer"
                        href={"mailto:" + email}
                        aria-label="Email"
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:dark:text-red-600 dark:bg-slate-800 transition-all hover:bg-slate-100"
                    >
                        <Mail/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
