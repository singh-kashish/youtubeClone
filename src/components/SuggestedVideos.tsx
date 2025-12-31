import React from "react";
import InfiniteVideoGrid from "./InfiniteVideoGrid";

type SuggestedVideoProps = {
  where: "Video" | "Home";
};

const SuggestedVideos: React.FC<SuggestedVideoProps> = ({ where }) => {
  return (
    <InfiniteVideoGrid where={where === "Home" ? "home" : "video"}/>
  );
};

export default SuggestedVideos;
