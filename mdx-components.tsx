import CopyToClip from '@/components/CopyToClip'
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className='text-3xl font-bold relative'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-2xl font-bold '>{children}</h2>,
    h3: ({ children }) => <h3 className='text-xl font-bold border-l-4 pl-4 '>{children}</h3>,
    h4: ({ children }) => <h4 className='text-lg font-bold '>{children}</h4>,
    h5: ({ children }) => <h5 className='text-md font-bold '>{children}</h5>,
    h6: ({ children }) => <h6 className='text-md font-bold '>{children}</h6>,
    p: ({ children }) => <p className='text-md font-normal'>{children}</p>,
    hr: ({ children }) => <hr className='py-3 mt-6'>{children}</hr>,

    blockquote: ({ children }) => <blockquote className='text-yellow-100 border-l-4 border-yellow-600 px-4 py-3 bg-yellow-950 max-w-lg'>{children}</blockquote>,
    ul: ({ children }) => <ul className='list-disc pl-8 text-slate-700 dark:text-slate-200 border-l-4'>{children}</ul>,
    ol: ({ children }) => <ol className='list-disc pl-8 text-slate-700 dark:text-slate-200 border-l-4'>{children}</ol>,
    li: ({ children }) => <li className='py-0'>{children}</li>,
    table: ({ children }) => <div className='w-full overflow-x-auto'><table className='table-auto'>{children}</table></div>,
    th: ({ children }) => <th className='border-2 bg-slate-200 dark:bg-slate-800'>{children}</th>,
    td: ({ children }) => <td className='border-2 p-2'>{children}</td>,
    tr: ({ children }) => <tr className=''>{children}</tr>,
    // code: ({ children }) => <CopyToClip children={children}/>,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    
  }
}