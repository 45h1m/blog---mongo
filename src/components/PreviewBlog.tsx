"use client";

import { useEffect, useState } from "react";

// export async function compileContent(md: string) {
//     const { content } = await compileMDX({
//         source: md,
//         options: {
//             parseFrontmatter: true,
//         },
//         components: {
//             h1: ({ children }:any) => <h1 className="text-3xl font-bold relative">{children}</h1>,
//             h2: ({ children }:any) => <h2 className="text-2xl font-bold ">{children}</h2>,
//             h3: ({ children }:any) => <h3 className="text-xl font-bold border-l-4 pl-2">{children}</h3>,
//             h4: ({ children }:any) => <h4 className="text-lg font-bold ">{children}</h4>,
//             h5: ({ children }:any) => <h5 className="text-md font-bold ">{children}</h5>,
//             h6: ({ children }:any) => <h6 className="text-md font-bold ">{children}</h6>,
//             p: ({ children }:any) => <p className="text-md font-normal text-slate-700 dark:text-slate-300">{children}</p>,
//             hr: ({ children }:any) => <hr className="py-3 mt-6">{children}</hr>,
//             blockquote: ({ children }:any) => (
//                 <blockquote className="border-yellow-400 px-3 py-2 border-l-4 bg-yellow-200/50 dark:bg-yellow-900/50">{children}</blockquote>
//             ),
//             ul: ({ children }:any) => <ul className="list-disc pl-8 text-slate-800 dark:text-slate-200 border-l-4">{children}</ul>,
//             ol: ({ children }:any) => <ol className="list-disc pl-8 text-slate-800 dark:text-slate-200 border-l-4">{children}</ol>,
//             li: ({ children }:any) => <li className="py-0">{children}</li>,
//             table: ({ children }:any) => (
//                 <div className="w-full overflow-x-auto">
//                     <table className="table-auto">{children}</table>
//                 </div>
//             ),
//             th: ({ children }:any) => <th className="border-2 bg-slate-200 dark:bg-slate-800">{children}</th>,
//             td: ({ children }:any) => <td className="border-2 p-2">{children}</td>,
//             tr: ({ children }:any) => <tr className="">{children}</tr>,
//             pre: ({ children }:any) => <CopyToClip>{children}</CopyToClip>,
//             code: ({ children }:any) => <code className="bg-slate-200 dark:bg-slate-800 rounded-sm px-2">{children}</code>,
//             img: ({ children, src, alt }:any) => (
//                 <img src={src} alt={alt} className="w-full max-h-96 object-contain">
//                     {children}
//                 </img>
//             ),
//         },
//     });

//     return content;
// }

const PreviewBlog = ({ content }: any) => {
    const [compiledContent, setCompiledContent] = useState<React.ReactElement | null>(null);
    
    const processTextContent = async () => {
        if (!content) return;
        
        import("./functions").then(async (mod) => {
            const compileContent = mod.compileContent;
            const _compiledContent = await compileContent(content);
            setCompiledContent(_compiledContent);
        });
    };

    useEffect(() => {
        processTextContent();
    }, [content]);

    return (
        <div>
            <div className="blog-container max-w-2xl p-3 flex flex-col gap-4 sm:border rounded-lg sm:shadow-sm sm:bg-white dark:sm:bg-slate-900 py-4 break-words">
                {compiledContent && compiledContent}
            </div>
        </div>
    );
};

export default PreviewBlog;
