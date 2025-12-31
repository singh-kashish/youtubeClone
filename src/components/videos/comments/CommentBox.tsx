import React, { useState } from "react";
import styles from "../../styles/Comments.module.css";
import { addComment } from "../../../supabase/mutations";
import toast from "react-hot-toast";
import { VideoWithProfile, CommentWithProfile } from "../../../types/VideoLoadTypes";
import { User } from "@supabase/auth-helpers-react";

interface Props {
  video: VideoWithProfile;
  user: User | null;
  addCommentOptimistically: (comment: CommentWithProfile) => void;
}

const CommentBox: React.FC<Props> = ({ video, user, addCommentOptimistically }) => {
  const [content, setContent] = useState<string>("");

 const handlePostComment = async () => {
  if (!user) {
    toast.error("Please log in to post a comment.");
    return;
  }
  if (!content.trim()) return;

  const toastId = toast.loading("Posting comment...");

  try {
    const comment = await addComment({
      user_id: user.id,
      video_id: video.id,
      text: content,
    });

    setContent("");

    addCommentOptimistically({
      ...comment,
      profiles: {
        id: user.id,
        username:
          user.user_metadata.username ||
          user.user_metadata.full_name ||
          user.email!,
        full_name: user.user_metadata.full_name || "",
        avatar_url:
          user.user_metadata.avatar_url || "/default-avatar.png",
      },
      likedComments: [],
    });

    toast.success("Comment posted!", { id: toastId });
  } catch (err) {
    toast.error("Failed to post comment.", { id: toastId });
  }
};


  return (
    <div id={styles.commentBox}>
      <textarea
        className="w-full text-white bg-gray-800 p-2 rounded"
        placeholder="Add a public comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="text-right mt-2">
        <button
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
          onClick={handlePostComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentBox;


