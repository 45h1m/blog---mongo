interface postProps {
    title: string,
    description: string,
    date: string,
    slug: string
}

const PostCardSmall = ({title, description, date, slug}:postProps) => {
    return (
        <a href={'/blog/'+slug} title={title}>
            <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 shadow-sm min-w-60">
                <h3 className="border-l-4 border-red-600 pl-2 text-lg font-bold dark:text-slate-300">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 line-clamp-2 pt-2">{description}</p>
                <dl>
                    <dt className="hidden">Published on</dt>
                    <dd>
                        <p className="text-xs text-slate-500 pt-3">{date}</p>
                    </dd>
                </dl>
            </div>
        </a>
    );
};

export default PostCardSmall;
