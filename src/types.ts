export type BlogPost = {
    title: string;
    description: string;
    thumbnail: string;
    content: string;
    author: string;
    authorDP: string;
    tags: Array<string>;
    slug: string;
    published?: boolean
};

export type Comment = {
    name: string;
    email: string;
    dp: string;
    content: string;
};

export type StoryType = {
    title: string;
    author: string;
    authorDP: string | null;
    cover: {
        image: string;
        audio: string | null;
    };
    slug: string,
    pages: Array<{
        image: string;
        title: string;
        description: string;
        audio: string | null;
        video: string | null;
        href: string;
    }>;
    nexthref: string;
    createdAt?: Date;
    updatedAt?: Date;
};
