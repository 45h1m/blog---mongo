import Image from "next/image";
import Link from "next/link";

type Story = {
    href: string,
    image: string,
    title: string
};

const StoryCard = ({ href="/", image="/flamer-og.webp", title="Title of story, a bit of description" }:Story) => {
    return (
        <Link href={href} className="snap-center">
            <div className="shadow-lg border-2 w-64 h-96 flex items-end rounded-xl relative overflow-hidden bg-slate-50 dark:bg-slate-800 p-2">
                <img src={image} width={400} height={400} alt="story" className="hover:scale-125 transition-all duration-1000 ease absolute top-0 left-0 w-full h-full object-cover" />
                <div className="z-10 rounded-md p-2 flex flex-col justify-end bg-slate-50 dark:bg-slate-800">
                    <h2 className="border-l-4 border-red-600 pl-2 text-lg font-bold">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default StoryCard;
