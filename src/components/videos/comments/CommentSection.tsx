// import React from "react";
// import Comment from "./Comment";
// import { CommentWithProfile, VideoWithProfile } from "../../../types/VideoLoadTypes";

// const CommentSection = ({
//   comments,
//   video,
//   user,
//   addCommentOptimistically,
// }: {
//   comments: CommentWithProfile[];
//   video: VideoWithProfile;
//   user: any;
//   addCommentOptimistically: (newComment: CommentWithProfile) => void;
// }) => {
//   return (
//     <Comment
//       comments={comments}
//       video={video}
//       addCommentOptimistically={addCommentOptimistically}
//     />
//   );
// };

// export default React.memo(CommentSection);
// src/components/video/comments/CommentSection.tsx
import React from "react";
import Comment from "./Comment";
import { CommentWithProfile, VideoWithProfile } from "../../../types/AppTypes";

const CommentSection = ({
  comments,
  video,
  user,
  addCommentOptimistically,
  setComments,
}: {
  comments: CommentWithProfile[];
  video: VideoWithProfile;
  user: any;
  addCommentOptimistically: (newComment: CommentWithProfile) => void;
  setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
}) => {
  return (
    <Comment
      comments={comments}
      video={video}
      addCommentOptimistically={addCommentOptimistically}
      setComments={setComments}
    />
  );
};

export default React.memo(CommentSection);
