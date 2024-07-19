import { getStories } from "@/_actions/storyActions";
import StoryCard from "./StoryCard";

const StoriesSection = async () => {

    const stories = await getStories();

    return (
        <>
            <h3 className="p-4 pt-8 text-lg font-bold">Visual Stories 😲</h3>
            <div className="flex gap-2 w-full overflow-x-auto sm:overflow-x-clip sm:flex-wrap p-4 snap-mandatory snap-x">
                {stories? stories.length? stories.map((story: any, index: any) => (
                          <StoryCard
                              key={"story-" + index}
                              title={story.title}
                              image={"/stories/" + story.cover.image}
                              href={"/stories/" + story.slug + ".html"}
                          />
                      ))
                    : "Stay tuned, coming soon":""}
            </div>
        </>
    );
};

export default StoriesSection;