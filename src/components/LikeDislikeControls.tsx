import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const LikeDislikeControls = React.memo(({ likes, toggleLike }: any) => {
  return (
    <div className="md:ml-2 flex items-center gap-3">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => toggleLike(true)}
      >
        <ThumbUpIcon className="text-white" />
        <span className="text-white ml-1">{likes.totalLikes}</span>
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => toggleLike(false)}
      >
        <ThumbDownOffAltIcon className="text-white" />
        <span className="text-white ml-1">{likes.totalDislikes}</span>
      </div>
    </div>
  );
});

export default LikeDislikeControls;
