import CopyToClip from "@/components/CopyToClip";
import type { MDXComponents } from "mdx/types";
import React from "react";

export const customMDXComponents: MDXComponents = {
    h1: ({ children, ...props }) => (
        <h1 className="text-3xl font-bold relative" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 className="text-2xl font-bold" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 className="text-xl font-bold border-l-4 pl-2" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4 className="text-lg font-bold" {...props}>
            {children}
        </h4>
    ),
    h5: ({ children, ...props }) => (
        <h5 className="text-md font-bold" {...props}>
            {children}
        </h5>
    ),
    h6: ({ children, ...props }) => (
        <h6 className="text-md font-bold" {...props}>
            {children}
        </h6>
    ),

    p: ({ children, ...props }) => (
        <p className="text-md font-normal text-slate-700 dark:text-slate-300" {...props}>
            {children}
        </p>
    ),

    hr: (props) => <hr className="py-3 mt-6" {...props} />,

    blockquote: ({ children, ...props }) => (
        <blockquote className="border-yellow-400 px-3 py-2 border-l-4 bg-yellow-200/50 dark:bg-yellow-900/50" {...props}>
            {children}
        </blockquote>
    ),

    ul: ({ children, ...props }) => (
        <ul className="list-disc pl-8 text-slate-800 dark:text-slate-200 border-l-4" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }) => (
        <ol className="list-decimal pl-8 text-slate-800 dark:text-slate-200 border-l-4" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }) => (
        <li className="py-0" {...props}>
            {children}
        </li>
    ),

    table: ({ children, ...props }) => (
        <div className="w-full overflow-x-auto" {...props}>
            <table className="table-auto">{children}</table>
        </div>
    ),
    th: ({ children, ...props }) => (
        <th className="border-2 bg-slate-200 dark:bg-slate-800" {...props}>
            {children}
        </th>
    ),
    td: ({ children, ...props }) => (
        <td className="border-2 p-2" {...props}>
            {children}
        </td>
    ),
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,

    pre: ({ children, ...props }) => <CopyToClip {...props}>{children}</CopyToClip>,

    code: ({ children, ...props }) => (
        <code className="bg-slate-200 dark:bg-slate-800 rounded-sm px-2" {...props}>
            {children}
        </code>
    ),

    img: ({ src, alt, ...props }) => <img src={src} alt={alt} className="w-full max-h-[90vh] object-contain border my-2 rounded-sm" {...props} />,

    a: ({ children, href, ...props }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
            {...props}
        >
            {children}
        </a>
    ),
};
