import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import CopyToClip from './CopyToClip';
import { customMDXComponents } from '../../mdx-components';

const contentRootDir = path.join(process.cwd(), '/', 'content/blog');

export async function compileContent(md:string) {
  const { content } = await compileMDX({
    source: md,
    options : {
      parseFrontmatter: true
    },
    components: customMDXComponents  });

  return content;
}
