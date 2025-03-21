// "use client";

// import { InitialTweets } from "@/app/tweets/page";
// import ListTweet from "./list-tweet";
// import { useState } from "react";
// import { getMoreTweets } from "@/app/tweets/actions";

// interface TweetListProps {
//   initialTweets: InitialTweets;
// }

// export default function TweetList({ initialTweets }: TweetListProps) {
//   const [tweets, setTweets] = useState(initialTweets);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const onLoadMoreClick = async () => {
//     setIsLoading(true);
//     const newTweets = await getMoreTweets(page + 1);
//     if (newTweets.length !== 0) {
//       setPage((prev) => prev + 1);
//       setTweets((prev) => [...prev, ...newTweets]);
//     } else {
//       setIsLastPage(true);
//     }
//     setIsLoading(false);
//   };
//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {tweets.map((tweet) => (
//         <ListTweet key={tweet.id} {...tweet} />
//       ))}
//       {isLastPage ? (
//         "No more items"
//       ) : (
//         <button
//           onClick={onLoadMoreClick}
//           disabled={isLoading}
//           className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
//         >
//           {isLoading ? "로딩 중" : "Load more"}
//         </button>
//       )}
//     </div>
//   );
// }
"use client";

import { InitialTweets } from "@/app/tweets/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/tweets/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onNextClick = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newTweets = await getMoreTweets(nextPage);

    if (newTweets.length !== 0) {
      setPage(nextPage);
      setTweets(newTweets);
    }
    setIsLoading(false);
  };

  const onPreviousClick = async () => {
    if (page === 0) return;
    setIsLoading(true);
    const prevPage = page - 1;
    const newTweets = await getMoreTweets(prevPage);
    setPage(prevPage);
    setTweets(newTweets);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      <div className="flex justify-center gap-4">
        <button
          onClick={onPreviousClick}
          disabled={page === 0 || isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          Previous
        </button>
        <button
          onClick={onNextClick}
          disabled={isLoading || tweets.length === 0}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      </div>
      <p className="text-center text-sm mt-2">page: {page + 1}</p>
    </div>
  );
}
