import React from "react";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./VideoIcon";
import Shimmer from "./Shimmer";
import useVideoLoadHook from "../hooks/useVideoLoadHook";
import SortByButton from "./SortByButton";

const SuggestedVideos = ({ where }) => {
  let { videos, loading, error } = useVideoLoadHook();
  if (where === "Video") {
    if (loading) {
      return (
        <div
          className="flex flex-col items-center justify-center text-xxl my-2"
          id={styles.wobble}
        >
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div id={styles.video}>
          <SortByButton className="w-fit" />
          {videos?.map((pie) => (
            <VideoIcon video={pie} where="video" key={pie?.id} />
          ))}
        </div>
      );
    }
  } else if (where === "Home") {
    if (loading) {
      return (
        <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-fit min-h-screen  bg-zinc-900">
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-end justify-center lg:mt-6">
          <SortByButton />
          <div id={styles.home} className="bg-zinc-900">
            {videos?.map((pie) => (
              <VideoIcon
                video={pie}
                where="home"
                className="mt-1 max-w-fit"
                key={pie?.id}
              />
            ))}
          </div>
        </div>
      );
    }
  } else {
    return <div className="bg-zinc-900	min-h-screen w-full">Dont't know</div>;
  }
};

export default SuggestedVideos;
