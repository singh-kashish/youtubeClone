import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "../../styles/Comments.module.css";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

function Comment({ comments, video }) {
  const user = useUser();
  return (
    <div id={styles.main}>
      <h1 className="font-sans font-bold text-lg border-b-2 border-gray-400 w-full text-white mb-1 pb-1">
        {comments.length} Comments
      </h1>
      <CommentBox video={video} user={user} />
      <CommentList comments={comments} user={user}/>
    </div>
  );
}

export default Comment;
