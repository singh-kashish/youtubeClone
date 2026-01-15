// src/hooks/useCommentHook.ts

import { useState, useEffect } from "react";
//import { commentService } from "../modules/comment";
import { CommentWithProfile, LikedComment } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

interface UseCommentsResult {
  comments: CommentWithProfile[];
  loading: boolean;
  error: PostgrestError | null;
  addComment: (comment: { text: string; video_id: string }) => void;
  updateComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
  toggleLike: (commentId: string, liked: boolean) => void;
}

export function useComments(videoId: string): UseCommentsResult {
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      // const response = await commentService.fetchCommentsByVideoId(videoId);
      // setComments(response.commentsWithProfile ?? []);
      // setLoading(response.loading);
      // setError(response.error);
    };

    fetchComments();
  }, [videoId]);

  const addComment = async (comment: { text: string; video_id: string }) => {
    // try {
    //   const newComment = await commentService.addComment(comment);
    //   setComments((prev) => [...prev, newComment as CommentWithProfile]);
    // } catch (e) {
    //   setError(e as PostgrestError);
    // }
  };

  const updateComment = async (id: string, text: string) => {
    try {
      // const updatedComment = await commentService.updateComment(id, text);
      // setComments((prev) =>
      //   prev.map((comment) =>
      //     comment.id === id
      //       ? { 
      //           ...comment, 
      //           text: updatedComment?.text ?? null // Use null if text is undefined
      //         }
      //       : comment
      //   )
      // );
    } catch (e) {
      setError(e as PostgrestError);
    }
  };
  

  const deleteComment = async (id: string) => {
    // try {
    //   await commentService.deleteComment(id);
    //   setComments((prev) => prev.filter((comment) => comment.id !== id));
    // } catch (e) {
    //   setError(e as PostgrestError);
    // }
  };

  const toggleLike = async (commentId: string, liked: boolean) => {
    //try {
      // const { likedComment } = await commentService.likeComment("user_id", commentId, liked);
    //    if (likedComment) {
    //     setComments((prev) =>
    //       prev.map((comment) =>
    //         comment.id === commentId
    //           ? {
    //               ...comment,
    //               likedComments: [
    //                 ...(comment.likedComments ?? []), // Ensure likedComments is always an array
    //                 likedComment,
    //               ],
    //             }
    //           : comment
    //       )
    //     );
    //   }
    // } catch (e) {
    //   setError(e as PostgrestError);
    // }
  };

  return { comments, loading, error, addComment, updateComment, deleteComment, toggleLike };
}
