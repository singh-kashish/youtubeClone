import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import VideoIcon from "./VideoIcon";
import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS_BY_SEARCH_TEXT } from "../graphql/queries";
import styles from "./styles/VideoSearch.module.css";

function VideoSearch({ text }) {
  const user = useUser();
  let searchText = `${text}:*`;
  const { loading, error, data } = useQuery(GET_VIDEOS_BY_SEARCH_TEXT, {
    variables: {
      text: searchText,
    },
  });
  // viewcount filter desc
  // function filterDescend(arr, impKey) {
  //   console.warn(arr);
  //   arr.sort((a, b) => {
  //     a.impKey > b.impKey;
  //   });
  //   console.warn(arr);
  // }
  const videosFound = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center" id={styles.wobble}>
          <LineWobble size={300} color="red" />
        </div>
      );
    } else if (!data || data?.getVideosUsingSearchText?.length === 0) {
      return (
        <div
          className="flex items-center justify-center p-10 text-xxl m-1/2"
          id={styles.main}
        >
          <h2>No Videos found.</h2>
        </div>
      );
    } else {
      console.log(data?.getVideosUsingSearchText);
      filterDescend(
        data?.getVideosUsingSearchText,
        data?.getVideosUsingSearchText.viewCount
      );
      console.log(data?.getVideosUsingSearchText);
      return (
        <div id={styles.main}>
          {data?.getVideosUsingSearchText?.map((pie) => (
            <VideoIcon video={pie} where="search" />
          ))}
        </div>
      );
    }
  };
  const returnVideos = () => {
    return videosFound();
  };
  return (
    <div className="">
      <h6 className="font-sans font-bold text-xl text-center text-gray-300">
        Videos
      </h6>
      {returnVideos()}
    </div>
  );
}

export default VideoSearch;
