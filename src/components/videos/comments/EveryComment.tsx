// src/components/comments/EveryComment.tsx
import React, { useMemo, useState } from "react";
import Avatar from "../../Avatar";
import {
  addLikeOnComment,
  removeLikeOnComment,
  updateLikeOnComment,
  updateComment,
  deleteComment,
} from "../../../supabase/mutations";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
import toast from "react-hot-toast";
import type { CommentWithProfile, LikedComment } from "../../../types/VideoLoadTypes";
import type { User } from "@supabase/auth-helpers-react";

interface Props {
  comment: CommentWithProfile;
  user: User | null;
  setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
}

const EveryComment: React.FC<Props> = ({ comment, user, setComments }) => {
  const [likes, setLikes] = useState<LikedComment[]>(comment.likedComments);
  const [editCall, setEditCall] = useState(false);
  const [textForEdit, setTextForEdit] = useState(comment.text);

  const myVote = useMemo(
    () => likes.find((l) => l.user_id === user?.id),
    [likes, user?.id]
  );

  const likeCount = likes.filter((l) => l.like).length;
  const dislikeCount = likes.filter((l) => !l.like).length;

  const vote = async (like: boolean) => {
    if (!user?.id) return toast.error("Login to vote");

    try {
      if (myVote && myVote.like === like) {
        await removeLikeOnComment(myVote.id);
        setLikes((p) => p.filter((l) => l.id !== myVote.id));
      } else if (myVote) {
        await updateLikeOnComment(myVote.id, like);
        setLikes((p) =>
          p.map((l) => (l.id === myVote.id ? { ...l, like } : l))
        );
      } else {
        const newLike = await addLikeOnComment({
          comment_id: comment.id,
          user_id: user.id,
          like,
        });
        setLikes((p) => [...p, newLike]);
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Voting failed");
    }
  };

  const handleEdit = async () => {
    try {
      const updated = await updateComment(comment.id, textForEdit);
      setEditCall(false);
      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? { ...c, text: updated.text } : c))
      );
      toast.success("Comment updated");
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      setComments((p) => p.filter((c) => c.id !== comment.id));
      toast.success("Comment deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex space-x-2">
      <Avatar
        uid={comment.user_id}
        url={comment.profiles.avatar_url}
        where="video"
        size={35}
      />
      <div>
        <p className="font-bold">{comment.profiles.username}</p>

        {editCall ? (
          <div>
            <input
              value={textForEdit}
              onChange={(e) => setTextForEdit(e.target.value)}
              className="rounded-full text-black px-2"
            />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setEditCall(false)}>Cancel</button>
          </div>
        ) : (
          <p>{comment.text}</p>
        )}

        <div className="flex space-x-4 text-sm mt-1">
          <span onClick={() => vote(true)}>
            <ThumbUpOutlined fontSize="inherit" /> {likeCount}
          </span>
          <span onClick={() => vote(false)}>
            <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
          </span>

          {user?.id === comment.user_id && (
            <>
              <button onClick={() => setEditCall(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EveryComment;
