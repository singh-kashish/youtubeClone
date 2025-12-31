import React from "react";
import styles from "../../styles/CommentList.module.css";
import EveryComment from "./EveryComment";
import { CommentWithProfile } from "../../../types/VideoLoadTypes";
import { User } from "@supabase/auth-helpers-react";

interface Props {
  user: User | null;
  comments: (CommentWithProfile | null | undefined)[];
  setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
}

const CommentList: React.FC<Props> = ({ user, comments, setComments }) => {
  return (
    <div id={styles.main}>
      {comments
        .filter((c): c is CommentWithProfile => !!c)
        .map((comment) => (
          <EveryComment comment={comment} user={user} setComments={setComments} key={comment?.id} />
        ))}
    </div>
  );
};

export default CommentList;
