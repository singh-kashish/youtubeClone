import React from "react";
import styles from "../../styles/Comments.module.css";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { useUser } from "@supabase/auth-helpers-react";
import { CommentWithProfile, VideoWithProfile } from "../../../types/VideoLoadTypes";

interface CommentProps {
  comments: CommentWithProfile[];
  video: VideoWithProfile;
  addCommentOptimistically: (comment: CommentWithProfile) => void;
}

const Comment: React.FC<CommentProps> = ({ comments, video, addCommentOptimistically }) => {
  const user = useUser();

  return (
    <div id={styles.container}>
      <h2 className="text-lg font-bold text-white mb-4">{comments?.length || 0} Comments</h2>
      <CommentBox
        video={video}
        user={user}
        addCommentOptimistically={addCommentOptimistically}
      />
      <div id={styles.comments}>
        <CommentList comments={comments} user={user} />
      </div>
    </div>
  );
};

export default Comment;
