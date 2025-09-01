import React from "react";
import Comment from "./Comment";
import { CommentWithProfile, VideoWithProfile } from "../../../types/VideoLoadTypes";

const CommentSection = ({
  comments,
  video,
  user,
  addCommentOptimistically,
}: {
  comments: CommentWithProfile[];
  video: VideoWithProfile;
  user: any;
  addCommentOptimistically: (newComment: CommentWithProfile) => void;
}) => {
  return (
    <Comment
      comments={comments}
      video={video}
      addCommentOptimistically={addCommentOptimistically}
    />
  );
};

export default React.memo(CommentSection);
