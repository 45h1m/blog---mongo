"use client";
import "@/app/landing.css";
import { MoveUpRight } from "lucide-react";
import { useEffect } from "react";

const LandingSection = () => {
    useEffect(() => {
        let currentActive: any = document.querySelectorAll(".gallery-img")[0];
        let currentActiveIndex = 0;

        const imageChangeLogic = () => {
            const galleryImages = document.querySelectorAll(".gallery-img");
            if (!galleryImages || galleryImages.length === 0) return;
            if (currentActive) currentActive.classList.remove("active");
            galleryImages[currentActiveIndex].classList.add("active");
            currentActive = galleryImages[currentActiveIndex];
            currentActiveIndex++;
            if (currentActiveIndex >= galleryImages.length) currentActiveIndex = 0;
        };

        imageChangeLogic();
        const galleryTimer = window.setInterval(imageChangeLogic, 3000);

        document.documentElement.classList.add("loaded");

        return () => window.clearInterval(galleryTimer);
    }, []);

    return (
        <div className="relative gallery-container w-full h-[85vh] flex flex-col">
            
            <div className="text-center pt-10  p-4 flex flex-col justify-end">
                <h1 className="text-6xl font-bold slide-up-d1 opacity-0">
                    We build
                </h1>
                <h1 className="text-xl slide-up opacity-0">
                    From <span className="text-2xl font-bold text-red-600">scratch</span><span className="text-red-600 text-2xl">.</span>
                </h1>
            </div>
            <div className="overflow-hidden p-6 py-10 pb-12 flex h-full relative items-center justify-center opacity-0 slide-up-d2">
                <div className="relative w-full h-full flex justify-center">
                    <img className="border-2 gallery-img active" src="/landing-images/countddown.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/duet.jpg" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/fingle-home-screen.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/fingle-taking-attendance.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/interpolation.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/media-player.jpg" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/oxilive-graph.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/p-table-ui.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/power-tracker-hardware.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/power-tracker-realtime.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/power-tracker-saved-data.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/resso-ui.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/snake-ladder.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/landing-images/to-do-ui.webp" alt="gallery" />
                    <img className="border-2 gallery-img" src="/flamer-og.webp" alt="gallery" />
                </div>
            </div>
            <a
                href="/blog"
                className="opacity-0 slide-up-d3 mx-auto mb-32 text-md shadow-lg flex h-min w-fit items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-400 rounded-lg text-white font-semibold mt-2"
            >
                View Blogs{" "}
                <span>
                    <MoveUpRight size={24} />
                </span>
            </a>
        </div>
    );
};

export default LandingSection;
