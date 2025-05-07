import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import VideoIcon from "./VideoIcon";
import Shimmer from '../components/Shimmer';
import { useRouter } from "next/router";
import styles from "./styles/VideoSearch.module.css";
import useVideoSearchHook from "../hooks/useVideoSearchHook";

function VideoSearch({ text }) {
  const user = useUser();
  let data= useVideoSearchHook(text);
  const videosFound = () => {
    if (!data) {
      return (
        <div className="grid grid-cols-3 w-full gap-2 m-2">
          <Shimmer className=""/>
        </div>
      ); 
    } else if (data?.length===0) {
      return (
        <div
          className="flex items-center justify-center p-10 text-xxl m-1/2"
          id={styles.main}
        >
          <h2>No Videos found.</h2>
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {data?.map((pie) => (
            <VideoIcon video={pie} where="search" key={pie?.id} />
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
