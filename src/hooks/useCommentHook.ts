// src/hooks/useCommentHook.ts
// import { useState } from 'react';
// import {
//   addComment as addCommentApi,
//   updateComment as updateCommentApi,
//   deleteComment as deleteCommentApi,
//   addLikeOnComment,
//   modifyLikeOnComment,
//   removeLikeOnComment,
// } from '../modules/comment';
// import { CommentWithProfile } from '../types/VideoLoadTypes';

// type User = { id: string };

// function normalizeComment(raw: any): CommentWithProfile {
//   return {
//     id: raw?.id ?? '',
//     text: raw?.text ?? null,
//     created_at: raw?.created_at ?? null,
//     user_id: raw?.user_id ?? null,
//     video_id: raw?.video_id ?? null,
//     likeCount: raw?.likeCount ?? null,
//     dislikeCount: raw?.dislikeCount ?? null,
//     profiles: raw?.profiles ?? null,
//     likedComments: Array.isArray(raw?.likedComments) ? raw.likedComments : [],
//   };
// }

// export function useCommentHook(initialComments: (CommentWithProfile | null)[] = [], user?: User) {
//   // Always store only non-null comments
//   const [comments, setComments] = useState<CommentWithProfile[]>(
//     (initialComments ?? []).filter((c): c is CommentWithProfile => !!c).map(normalizeComment)
//   );

//   const create = async (dto: Parameters<typeof addCommentApi>[0]) => {
//     const newRaw = await addCommentApi(dto);
//     const newComment = normalizeComment(newRaw);
//     setComments(c => [...c, newComment]);
//   };

//   const edit = async (id: string, text: string) => {
//     const updatedRaw = await updateCommentApi(id, text);
//     setComments(prev =>
//       prev.map(ci =>
//         ci && ci.id === id
//           ? normalizeComment({ ...ci, ...updatedRaw })
//           : ci
//       )
//     );
//   };

//   const remove = async (id: string) => {
//     await deleteCommentApi(id);
//     setComments(prev => prev.filter(ci => ci && ci.id !== id));
//   };

//   const toggleLike = async (commentId: string, isLike: boolean) => {
//     if (!user?.id) return;
//     setComments(prev => {
//       const idx = prev.findIndex(c => c && c.id === commentId);
//       if (idx === -1) return prev;
//       const comment = prev[idx];
//       if (!comment) return prev;

//       const likesArr = Array.isArray(comment.likedComments) ? comment.likedComments : [];
//       const existing = likesArr.find(lc => lc.user_id === user.id);

//       const updateLocal = (updatedLikes: typeof likesArr) => {
//         // Only update if comment is not null
//         if (prev[idx]) {
//           prev[idx] = normalizeComment({ ...comment, likedComments: updatedLikes });
//         }
//       };

//       const run = async () => {
//         if (existing) {
//           if (existing.like === isLike) {
//             await removeLikeOnComment(existing.id);
//             updateLocal(likesArr.filter(lc => lc.id !== existing.id));
//           } else {
//             await modifyLikeOnComment(existing.id, isLike);
//             updateLocal(
//               likesArr.map(lc => (lc.id === existing.id ? { ...lc, like: isLike } : lc))
//             );
//           }
//         } else {
//           const added = await addLikeOnComment({ comment_id: commentId, user_id: user.id, like: isLike });
//           updateLocal([...likesArr, added]);
//         }
//         setComments(current => {
//           const j = current.findIndex(c => c && c.id === commentId);
//           if (j === -1) return current;
//           // Only update if both prev[idx] and current[j] are not null
//           if (!prev[idx] || !current[j]) return current;
//           const updatedComment = normalizeComment({ ...current[j], likedComments: prev[idx]!.likedComments });
//           const next = [...current];
//           next[j] = updatedComment;
//           return next;
//         });
//       };

//       void run();
//       return prev;
//     });
//   };

//   return { comments, create, edit, remove, toggleLike };
// }
// import { useState } from 'react';
// import { addComment as addCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi, addLikeOnComment, modifyLikeOnComment, removeLikeOnComment } from '../modules/comment';
// import { CommentWithProfile } from '../types/VideoLoadTypes';

// type User = { id: string };

// function normalizeComment(raw: any): CommentWithProfile {
//   return {
//     id: raw?.id ?? '',
//     text: raw?.text ?? null,
//     created_at: raw?.created_at ?? null,
//     user_id: raw?.user_id ?? null,
//     video_id: raw?.video_id ?? null,
//     likeCount: raw?.likeCount ?? null,
//     dislikeCount: raw?.dislikeCount ?? null,
//     profiles: raw?.profiles ?? null,
//     likedComments: Array.isArray(raw?.likedComments) ? raw.likedComments : [],
//   };
// }

// export function useCommentHook(initialComments: (CommentWithProfile | null)[] = [], user?: User) {
//   const [comments, setComments] = useState<CommentWithProfile[]>(initialComments.filter((c): c is CommentWithProfile => !!c).map(normalizeComment));

//   const create = async (dto: Parameters<typeof addCommentApi>[0]) => {
//     const newRaw = await addCommentApi(dto);
//     const newComment = normalizeComment(newRaw);
//     setComments(c => [...c, newComment]);
//   };

//   const edit = async (id: string, text: string) => {
//     const updatedRaw = await updateCommentApi(id, text);
//     setComments(prev =>
//       prev.map(ci => (ci?.id === id ? normalizeComment({ ...ci, ...updatedRaw }) : ci))
//     );
//   };

//   const remove = async (id: string) => {
//     await deleteCommentApi(id);
//     setComments(prev => prev.filter(ci => ci && ci.id !== id));
//   };

//   const toggleLike = async (commentId: string, isLike: boolean) => {
//     if (!user?.id) return;
//     setComments(prev => {
//       const idx = prev.findIndex(c => c?.id === commentId);
//       if (idx === -1) return prev;
//       const comment = prev[idx];
//       const likesArr = Array.isArray(comment.likedComments) ? comment.likedComments : [];
//       const existing = likesArr.find(lc => lc.user_id === user.id);

//       const updateLocal = (updatedLikes: typeof likesArr) => {
//         if (prev[idx]) {
//           prev[idx] = normalizeComment({ ...comment, likedComments: updatedLikes });
//         }
//       };

//       const run = async () => {
//         if (existing) {
//           if (existing.like === isLike) {
//             await removeLikeOnComment(existing.id);
//             updateLocal(likesArr.filter(lc => lc.id !== existing.id));
//           } else {
//             await modifyLikeOnComment(existing.id, isLike);
//             updateLocal(
//               likesArr.map(lc => (lc.id === existing.id ? { ...lc, like: isLike } : lc))
//             );
//           }
//         } else {
//           const added = await addLikeOnComment({ comment_id: commentId, user_id: user.id, like: isLike });
//           updateLocal([...likesArr, added]);
//         }
//       };
//       run();
//       return prev;
//     });
//   };

//   return {
//     comments,
//     create,
//     edit,
//     remove,
//     toggleLike,
//   };
// }

import { useState, useEffect } from "react";
import { commentService } from "../modules/comment";
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
      const response = await commentService.fetchCommentsByVideoId(videoId);
      setComments(response.commentsWithProfile ?? []);
      setLoading(response.loading);
      setError(response.error);
    };

    fetchComments();
  }, [videoId]);

  const addComment = async (comment: { text: string; video_id: string }) => {
    try {
      const newComment = await commentService.addComment(comment);
      setComments((prev) => [...prev, newComment as CommentWithProfile]);
    } catch (e) {
      setError(e as PostgrestError);
    }
  };

  const updateComment = async (id: string, text: string) => {
    try {
      const updatedComment = await commentService.updateComment(id, text);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id
            ? { 
                ...comment, 
                text: updatedComment?.text ?? null // Use null if text is undefined
              }
            : comment
        )
      );
    } catch (e) {
      setError(e as PostgrestError);
    }
  };
  

  const deleteComment = async (id: string) => {
    try {
      await commentService.deleteComment(id);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (e) {
      setError(e as PostgrestError);
    }
  };

  const toggleLike = async (commentId: string, liked: boolean) => {
    try {
      const { likedComment } = await commentService.likeComment("user_id", commentId, liked);
      if (likedComment) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likedComments: [
                    ...(comment.likedComments ?? []), // Ensure likedComments is always an array
                    likedComment,
                  ],
                }
              : comment
          )
        );
      }
    } catch (e) {
      setError(e as PostgrestError);
    }
  };

  return { comments, loading, error, addComment, updateComment, deleteComment, toggleLike };
}
