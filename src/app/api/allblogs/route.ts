import { getBlogs } from '@/_actions/blogActions';
import { NextResponse } from 'next/server'

type BlogMeta = {
  title: string;
  slug: string;
  tags: string[];
};

export async function GET() {
  const {blogs}: any = await getBlogs();
  const resp = blogs.map((b: BlogMeta) => ({
    title: b.title,
    realSlug: b.slug,
    tags: b.tags
  }));

  return NextResponse.json(resp);
}
