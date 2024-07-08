import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import CopyToClip from './CopyToClip';

const contentRootDir = path.join(process.cwd(), '/', 'content/blog');

export async function compileContent(md:string) {
  const { content } = await compileMDX({
    source: md,
    options : {
      parseFrontmatter: true
    },
    components: {
    h1: ({ children }) => <h1 className='text-3xl font-bold relative'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-2xl font-bold '>{children}</h2>,
    h3: ({ children }) => <h3 className='text-xl font-bold border-l-4 pl-2'>{children}</h3>,
    h4: ({ children }) => <h4 className='text-lg font-bold '>{children}</h4>,
    h5: ({ children }) => <h5 className='text-md font-bold '>{children}</h5>,
    h6: ({ children }) => <h6 className='text-md font-bold '>{children}</h6>,
    p: ({ children }) => <p className='text-md font-normal text-slate-700 dark:text-slate-300'>{children}</p>,
    hr: ({ children }) => <hr className='py-3 mt-6'>{children}</hr>,
    blockquote: ({ children }) => <blockquote className='border-yellow-400 px-3 py-2 border-l-4 bg-yellow-200/50 dark:bg-yellow-900/50'>{children}</blockquote>,
    ul: ({ children }) => <ul className='list-disc pl-8 text-slate-800 dark:text-slate-200 border-l-4'>{children}</ul>,
    ol: ({ children }) => <ol className='list-disc pl-8 text-slate-800 dark:text-slate-200 border-l-4'>{children}</ol>,
    li: ({ children }) => <li className='py-0'>{children}</li>,
    table: ({ children }) => <div className='w-full overflow-x-auto'><table className='table-auto'>{children}</table></div>,
    th: ({ children }) => <th className='border-2 bg-slate-200 dark:bg-slate-800'>{children}</th>,
    td: ({ children }) => <td className='border-2 p-2'>{children}</td>,
    tr: ({ children }) => <tr className=''>{children}</tr>,
    pre: ({ children }) => <CopyToClip >{children}</CopyToClip>,
    code: ({ children }) => <code className='bg-slate-200 dark:bg-slate-800 rounded-sm px-2'>{ children }</code>,
    }
  });

  return content;
}