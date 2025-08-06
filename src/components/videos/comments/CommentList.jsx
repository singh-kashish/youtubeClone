import React from "react";
import styles from "../../styles/CommentList.module.css";
import EveryComment from "./EveryComment";

const CommentList = ({ user, comments }) => {
  console.log("CommentList loaded with comments:", comments);
  return (
    <div id={styles.main}>
      {comments?.map((comment) => (
        <EveryComment comment={comment} user={user} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
