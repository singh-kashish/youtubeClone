import React from "react";
import styles from "../../styles/Comments.module.css";
import CommentBox from "./CommentBox.jsx";
import CommentList from "./CommentList.jsx";
import { useUser } from "@supabase/auth-helpers-react";

/**
 * Comment component to display a list of comments and a comment input box for a video.
 * @param comments The list of comments for the video.
 * @param video The video object.
 * @param refreshVideo Function to refresh the video data.
 * @param addCommentOptimistically Function to optimistically add a comment to the UI.
 */
function Comment({ comments, video, refreshVideo, addCommentOptimistically }) {
  const user = useUser();
  console.log("Comments loaded:", comments);
  return (
    <div id={styles.container}>
      <h2 className="text-lg font-bold text-white mb-4">
        {comments?.length || 0} Comments
      </h2>
      <CommentBox
        video={video}
        user={user}
        refreshVideo={refreshVideo}
        addCommentOptimistically={addCommentOptimistically}
      />
      <div id={styles.comments}>
        {comments?.map((comment) => (
          <CommentList key={comment.id} comments={comments} />
        ))}
      </div>
    </div>
  );
}

export default Comment;