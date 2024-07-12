export type BlogPost = {
    title: string,
    description: string,
    thumbnail: string,
    content: string,
    author: string,
    authorDP: string,
    tags: Array<string>,
    slug: string
}

export type Comment = {
    name: string,
    email: string,
    dp: string,
    content: string,
}