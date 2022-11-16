import React from "react";
import styles from "./styles/CommentList.module.css";
import EveryComment from "./EveryComment";

const CommentList = ({ user, comments }) => {
  return (
    <div id={styles.main}>
      {comments?.map((comment) => (
        <EveryComment comment={comment} user={user} />
      ))}
    </div>
  );
};

export default CommentList;
