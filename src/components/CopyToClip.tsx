"use client";
import { Check, Copy } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

const CopyToClip = ({ children }: Props) => {

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {

        try {
            await navigator.clipboard.writeText(children?.toString().trim() || "");

            setCopied(true);
            
            setTimeout(() => {
                setCopied(false);
            }, 3000);

        } catch (err) {
            alert("Failed to copy text: "+ err);
        }


    };

    return (
        <span className="m-1 bg-slate-200 dark:bg-slate-800 rounded-md inline-flex gap-3 overflow-hidden items-center justify-between w-fit max-w-full lg:max-w-lg">
            <span className="overflow-x-auto px-2 py-1 pr-20">
                <pre>

                    <code>{children}</code>
                </pre>
            </span>

            <span className="self-start">
                <button aria-label="Copy To Clipboard" className="bg-slate-300 dark:bg-slate-700 rounded-md w-10 aspect-square flex items-center justify-center shadow-lg" onClick={copyToClipboard}>
                    {copied ? <Check size={18} /> : <Copy size={18}/>}
                </button>
            </span>
        </span>
    );
};

export default CopyToClip;
