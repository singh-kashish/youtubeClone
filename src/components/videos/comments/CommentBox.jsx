import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";

/**
 * CommentBox component to allow users to submit a new comment for a video.
 * @param video The video object containing the video ID.
 * @param user The authenticated user object.
 * @param refreshVideo Function to refresh the video data after adding a comment.
 * @param addCommentOptimistically Function to optimistically add a comment to the UI.
 */
function CommentBox({ video, user, refreshVideo, addCommentOptimistically }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to comment!");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    if (!video?.id) {
      toast.error("Invalid video ID!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Optimistically add the comment to the UI
      const newComment = {
        id: `temp-${Date.now()}`, // Temporary ID until server responds
        text: comment,
        created_at: new Date().toISOString(),
        user_id: user.id,
      };
      addCommentOptimistically(newComment);

      // Insert the comment into Supabase
      const { error } = await supabase
        .from("comment")
        .insert({
          video_id: video.id,
          user_id: user.id,
          text: comment,
          created_at: new Date().toISOString(),
        });

      if (error) throw new Error(`Error adding comment: ${error.message}`);

      // Clear the input
      setComment("");
      toast.success("Comment added successfully!");

      // Refresh the video data to get the updated comment list
      await refreshVideo();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add comment");

      // Rollback the optimistic update by refreshing the video data
      await refreshVideo();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="flex flex-col items-start md:flex-row md:w-full md:justify-start md:items-center">
      <div className="p-2 m-2 border rounded-lg bg-gray-800 text-white w-full">
      <textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isSubmitting}
        id="commentInput"
        className="w-full h-24 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      </div>
      <div className="flex justify-center">
        <button
          className="py-2 px-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none active:shadow-none cursor-pointer"
          onClick={onSubmit}
          disabled={isSubmitting || !comment.trim()}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button
          className="ml-2 cursor-pointer py-2 px-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none active:shadow-none"
          onClick={() => setComment("")}
          disabled={isSubmitting || !comment}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default CommentBox;