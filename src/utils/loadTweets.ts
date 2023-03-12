import { TWITTER_WIDGET_SDK } from "@config/constants";
import loadScript from "@utils/loadScript";

export default function loadTweets(tweetIds) {
  loadScript(TWITTER_WIDGET_SDK, "tweet").then(() => {
    tweetIds.forEach((tweetId) =>
      twttr.widgets.createTweet(tweetId, document.getElementById(tweetId), { cards: "hidden", theme: "dark" })
    );
  });
}

declare namespace twttr {
  const widgets: {
    createTweet(tweetId: string, element: HTMLElement | null, options: Record<string, any>);
  };
}
