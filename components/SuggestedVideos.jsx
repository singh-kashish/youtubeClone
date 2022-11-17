import React from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS } from "../graphql/queries";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./VideoIcon";

const SuggestedVideos = ({ where }) => {
  const { loading, error, data } = useQuery(GET_VIDEOS, {});
  if (where === "Video") {
    return (
      <div id={styles.video}>
        {data?.getVideoList?.map((pie) => (
          <VideoIcon video={pie} where="video" />
        ))}
      </div>
    );
  } else if (where === "Home") {
    return (
      <div id={styles.home}>
        {data?.getVideoList?.map((pie) => (
          <VideoIcon video={pie} where="home" />
        ))}
      </div>
    );
  } else {
    return <div>Dont't know</div>;
  }
};

export default SuggestedVideos;
