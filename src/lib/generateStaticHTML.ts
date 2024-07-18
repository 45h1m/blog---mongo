import { getStories } from "@/_actions/storyActions";
const fs = require('fs');
const path = require('path');

function generateAmpStoryHtml(story: any) {
    const pageHtml = story.pages
        .map(
            (page:any, index:any) => `
    <amp-story-page id="page${index + 1}">
      <amp-story-grid-layer template="fill">
        ${
            page.video
                ? `
        <amp-video autoplay loop width="720" height="1280" poster="${page.image}" layout="responsive" animate-in="fly-in-right" animate-in-duration="1s">
          <source src="${page.video}" type="video/mp4" />
        </amp-video>
        `
                : `
        <amp-img src="${page.image}" width="720" height="1280" layout="responsive"
          animate-in="fly-in-right" animate-in-duration="1s">
        </amp-img>
        `
        }
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical">
        <h1 animate-in="fly-in-left" animate-in-duration="1s">${page.title}</h1>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="bottom">
        <p animate-in="fly-in-bottom" animate-in-duration="1s" animate-in-delay="0.1s">${page.description}</p>
      </amp-story-grid-layer>
      ${
          page.audio
              ? `
      <amp-story-page-outlink layout="nodisplay">
        <script type="application/json">
          {"audio": "${page.audio}"}
        </script>
      </amp-story-page-outlink>
      `
              : ""
      }
      ${
          page.href
              ? `
      <amp-story-page-outlink layout="nodisplay" theme="dark">
        <a href="${page.href}">Learn more</a>
      </amp-story-page-outlink>
      `
              : ""
      }
    </amp-story-page>
  `
        )
        .join("");

    return `
  <!DOCTYPE html>
  <html ⚡>
    <head>
      <meta charset="utf-8" />
      <title>${story.title}</title>
      <meta name="description" content="${story.description}">
      <link rel="canonical" href="http://localhost:3000/stories/${story.slug}.html" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
      <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
      <link href="https://fonts.googleapis.com/css?family=Oswald:200,300,400" rel="stylesheet" />
      <style amp-custom>
        amp-story { font-family: 'Oswald',sans-serif; color: #fff; }
        amp-story-page { background-color: #000; }
        p {    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}
        h1 { font-weight: bold; font-size: 2.875em; font-weight: normal; line-height: 1.174; text-shadow: 0 0 10px black }
        p { font-weight: normal; font-size: 1.3em; line-height: 1.5em; color: #fff; text-shadow: 0 0 8px black  }
        q { font-weight: 300; font-size: 1.1em; text-shadow: 0 0 10px black  }
        amp-story-grid-layer.bottom { align-content:end; }
        amp-story-grid-layer.noedge { padding: 0px; }
        amp-story-grid-layer.center-text { align-content: center; }
        .wrapper { display: grid; grid-template-columns: 50% 50%; grid-template-rows: 50% 50%; }
        .banner-text { text-align: center; background-color: #000; line-height: 2em; }
      </style>
    </head>
    <body>
      <amp-story standalone
          title="${story.title}"
          publisher="${story.author}"
          publisher-logo-src="${story.authorDP || "/flamer.png"}"
          poster-portrait-src="${story.cover.image}">
        
        <!-- Cover page -->
        <amp-story-page id="cover">
          <amp-story-grid-layer template="fill">
            <amp-img src="${story.cover.image}" width="720" height="1280" layout="responsive"></amp-img>
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical">
            <h1>${story.title}</h1>
            <p>By ${story.author}</p>
          </amp-story-grid-layer>
        </amp-story-page>
  
        <!-- Story pages -->
        ${pageHtml}
  
        <!-- Bookend -->
        <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
      </amp-story>
    </body>
  </html>
    `;
}

export async function generateAMPs() {

    const stories = await getStories();

    if (!stories) return console.log("No stories found");

    try {
        
        const storiesPath = path.join(process.cwd(), 'public/stories');

        console.log(storiesPath);

        stories.forEach( story => {

            const HTML = generateAmpStoryHtml(story);
            fs.writeFileSync(path.join(storiesPath, `${story.slug}.html`), HTML);
        });

        console.log("AMP generated");

    } catch (error) {
        console.log(error);
    }
}
