import React from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS } from "../../graphql/queries";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./VideoIcon";
import { LineWobble } from "@uiball/loaders";
import Shimmer from "./Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../../reduxReducers/suggestedVideoSlice";

const SuggestedVideos = ({ where }) => {
  const { loading, error, data } = useQuery(GET_VIDEOS, {});
  const dispatch = useDispatch();
  if (!loading && data) {
    dispatch(loadVideos(data.getVideoList));
  }
  if (where === "Video") {
    if (!data) {
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
            <VideoIcon
              video={pie}
              where="home"
              className="mt-1 max-w-fit"
              key={pie?.id}
            />
          ))}
        </div>
      );
    }
  } else {
    return <div className="bg-zinc-900	min-h-screen w-full">Dont't know</div>;
  }
};

export default SuggestedVideos;
