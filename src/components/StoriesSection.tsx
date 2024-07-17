import StoryCard from "./StoryCard";

const StoriesSection = () => {
    return (
        <>
            <h3 className="p-4 pt-10">Visual Stories</h3>
            <div className="flex gap-2 w-full overflow-x-auto p-4 snap-mandatory snap-x">

                    <StoryCard title="Title of the story to catch attention" image="/flamer-og.webp" href="/blog" />
                    <StoryCard title="Title of the story to catch attention" image="/post2.webp" href="/blog" />
                    <StoryCard title="Title of the story to catch attention" image="/building.gif" href="/blog" />
                    <StoryCard title="Title of the story to catch attention" image="/flamer-og.webp" href="/blog" />
            </div>
        </>
    );
};

export default StoriesSection;
