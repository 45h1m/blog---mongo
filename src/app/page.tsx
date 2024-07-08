import Image from "next/image";
import { MoveUpRight } from "lucide-react";

export default async function Home() {
    
    return (
        <div className="h-svh pt-20">
            <div className="pt-4 flex flex-col gap-3 items-center">
                <Image width={300} height={250} src="/building.gif" alt="webpage-is-building-animation" className="w-full max-w-sm rounded-lg" />

                <h1 className="text-3xl font-bold text-center pt-7">Hey.. I am learning NextJS.</h1>
            </div>
            <div className="flex flex-col pt-4 items-center justify-center">
                <h5 className="text-xl font-bold pt-5">still building this site 😉</h5>
                <a href="/blog" className="flex w-fit items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-400 rounded-sm text-white font-semibold mt-2">
                    View Blogs{" "}
                    <span className="pt-1">
                        <MoveUpRight size={18} />
                    </span>
                </a>
            </div>
        </div>
    );
}
