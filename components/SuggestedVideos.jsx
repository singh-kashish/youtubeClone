import React from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS } from "../graphql/queries";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./VideoIcon";
import { LineWobble } from "@uiball/loaders";
import Shimmer from "./Shimmer";

const SuggestedVideos = ({ where }) => {
  const { loading, error, data } = useQuery(GET_VIDEOS, {});
  console.log('loading>',loading);
  console.log("err>", error);
  console.log("data>", data);
  if (where === "Video") {
    if (!data) {
      return (
        <div
          className="flex items-center justify-center text-xxl"
          id={styles.wobble}
        >
          <LineWobble size={442} color="red" />
        </div>
      );
    } else {
      return (
        <div id={styles.video}>
          {data?.getVideoList?.map((pie) => (
            <VideoIcon video={pie} where="video" key={pie?.id} />
          ))}
        </div>
      );
    }
  } else if (where === "Home") {
    if (!data) {
      return (
        <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-fit min-h-screen  bg-zinc-900">
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div id={styles.home} className="bg-zinc-900">
          {data?.getVideoList?.map((pie) => (
            <VideoIcon video={pie} where="home" className="mt-1 max-w-fit" key={pie?.id} />
          ))}
        </div>
      );
    }
  } else {
    return <div className="bg-zinc-900	min-h-screen w-full">Dont't know</div>;
  }
};

export default SuggestedVideos;
