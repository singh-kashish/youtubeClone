import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "./styles/subscriptions.module.css";
import VideoIcon from "../src/components/videos/VideoIcon";
import Shimmer from "../src/components/Shimmer";
import Link from "next/link";
import {useVideosBySubscriptions} from '../src/hooks/useVideosBySubscriptions';
function subscriptions() {
  const user = useUser();
const userId =
  user && typeof user?.id === "string"
    ? user?.id
    : undefined;

const { videos } = useVideosBySubscriptions(userId);
  const videosFound = () => {
    if (!user) {
      return (
        <Link href="/login">
        <h6 className="font-sans font-bold text-xl text-center text-blue-700 mb-1 pb-1 ml-[10px] mt-4">
          Login First!
        </h6></Link>
      );
    } else if (videos.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl text-center text-red-400 mb-1 pb-1 ml-[10px]">
          You haven't subscribed to any creator yet
        </h6>
      );
    } else if (!videos) {
      return (
        <div className="flex flex-row basis-80 flex-wrap ml-[10px] w-full">
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {videos.map((video) => (
            <VideoIcon
              key={video.id}
              video={video}
              where="subs"
            />
          ))}
        </div>
      );
    }
  };
  const returnVideos = () => {
    return videosFound();
  };
  return (
    <div className="min-h-screen">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Videos from your Subscriptions
      </h6>
      {returnVideos()}
    </div>
  );
}

export default subscriptions;
