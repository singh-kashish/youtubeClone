import React from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS } from "../graphql/queries";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./VideoIcon";
import { LineWobble } from "@uiball/loaders";

const SuggestedVideos = ({ where }) => {
  const { loading, error, data } = useQuery(GET_VIDEOS, {});
  if (where === "Video") {
    if (!data) {
      return (
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5 bg-zinc-900">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
        return (
          <div id={styles.video} className="bg-zinc-900">
            {data?.getVideoList?.map((pie) => (
              <VideoIcon video={pie} where="video" />
            ))}
          </div>
        );
    }
  } else if (where === "Home") {
    if(!data){
      return (
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5 bg-zinc-900">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else{ return (
      <div id={styles.home} className="bg-zinc-900">
        {data?.getVideoList?.map((pie) => (
          <VideoIcon video={pie} where="home" />
        ))}
      </div>
    );}
  } else {
    return <div className="bg-zinc-900	">Dont't know</div>;
  }
};

export default SuggestedVideos;
