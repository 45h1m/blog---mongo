"use client";

import { LoaderCircle, Sparkles, Speech } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const ReadAloud = ({ onclick, children }: any) => {
    const { toast } = useToast();
    const [content, setContent] = useState(children);
    const [reading, setReading] = useState(false);
    let [donePreparing, setDonePreparing] = useState(false);

    
    const handleSpeech = () => {
        const synth = window.speechSynthesis;
        
        const container = document.querySelector("#blog-contents");
        if(!donePreparing) prepareHTML(container);
        setDonePreparing(true);
        
        if(reading) {
            
            synth.cancel();
            container?.querySelector(".active-speaking-text")?.classList.remove("active-speaking-text");
            setReading(false);
        } else {
            
            setReading(true);
            readBlog(container, synth).then(() => setReading(false))
        }
    };

    const prepareHTML = (container:any) => {

        const nodes = container?.childNodes;
        replaceTextWithSpan(container);
    };

    const readBlog = (container:any, synth:any) => {
        return new Promise(async (resolve, reject) => {
            try {
    
                const allSpans = container?.querySelectorAll(".text-span") || [];
                const allSpansArr = Array.from(allSpans);
    
                const speakAsync = async (span: any, utterance: any) => {
                    return new Promise((resolve, reject) => {
                        utterance.onstart = () => {
                            span.scrollIntoView({
                                behavior: "smooth", // Scroll smoothly
                                block: "center", // Align the element with the center of the viewport
                                inline: "nearest", // Align the element with the nearest edge of the viewport
                            });
                            span.classList.add("active-speaking-text");
                        };
                        utterance.onend = () => {
                            span.classList.remove("active-speaking-text");
                            resolve("spoken");
                        };
    
                        synth.speak(utterance);
                    });
                };
    
                for (const span of allSpansArr as HTMLSpanElement[]) {
                    const text = span.textContent || "";
                    const utterance = new SpeechSynthesisUtterance(text || "");
                    utterance.rate = 1.2;
    
                    await speakAsync(span, utterance);
                }
    
                resolve("Blog reading end");
    
            } catch (error) {
                reject(error);
            }
        });
    }

    const replaceTextWithSpan = (parent: any) => {
        if (parent.childNodes.length === 1 && parent.childNodes[0].nodeType === 3) {
            let text = parent.childNodes[0].data;
            let spanText = `<span class="text-span">${text}</span>`;
            parent.innerHTML = spanText;
            return;
        }

        Array.from(parent.childNodes).forEach((node: any) => {
            replaceTextWithSpan(node);
        });

        Array.from(parent.childNodes).forEach((node: any) => {
            if (node.nodeType === 3 && node.nodeValue !== "\n") {
                let text = node.nodeValue;
                let spanText = `<span class="text-span">${text}</span>`;
                const elem = document.createElement("span");
                elem.innerHTML = spanText;
                parent.replaceChild(elem, node);
            }
        });
    };

    return (
        <div>
            <div id="blog-contents" className="flex flex-col gap-3">
                {content}
            </div>
            <div className="sticky bottom-0 py-4 pt-6 bg-gradient-to-t from-slate-100 dark:from-slate-950 from-10% to-transparent flex gap-2">
                <button
                    onClick={handleSpeech}
                    className=" h-min  bg-gradient-to-t from-red-600 to-red-400 px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-red-500/20 text-white flex gap-2 items-center"
  
                >
                    <Speech size={20} /> {reading ? <LoaderCircle size={18} className="animate-spin" /> : "Read Aloud"}
                </button>
                <button
                onClick={() => {
                    toast({
                        title: "Will be available soon 😉",
                        description: "Working on it",
                    });
                }} 
                className=" h-min  bg-gradient-to-t from-pink-600 to-violet-400 px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-pink-500/20 text-white flex gap-2">
                    <Sparkles size={20} /> AI Summary
                </button>
            </div>
        </div>
    );
};

export default ReadAloud;
