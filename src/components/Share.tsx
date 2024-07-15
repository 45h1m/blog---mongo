"use client";

type shareOptions = {
    url?: string;
    title?: string;
    description?: string;
};

const Share = ({ url, title, description }: shareOptions) => {
    const handleClick = async () => {
        try {
            url
                ? title
                    ? description
                        ? await navigator.share({ url, title, text: description })
                        : await navigator.share({ url, title })
                    : await navigator.share({ url })
                : await navigator.share({ url: window.location.href });
        } catch (error) {
            console.log("Failed to share: " + error);
        }
    };

    return <button className="w-full text-start" onClick={handleClick}>Share</button>;
};

export default Share;
