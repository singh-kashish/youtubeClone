// // src/modules/comment.ts
// import { supabase } from "../components/utils/supabase";
// import { TablesInsert, TablesUpdate } from "../../lib/database.types";
// import { CommentWithProfile, LoadCommentsResponse } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export async function loadCommentsByVideoId(video_id: string): Promise<LoadCommentsResponse> {
//   try {
//     const { data, error, status } = await supabase
//       .from("comment")
//       .select(`
//         id,
//         text,
//         created_at,
//         user_id,
//         video_id,
//         likeCount,
//         dislikeCount,
//         profiles (
//           id,
//           username,
//           avatar_url,
//           updated_at,
//           full_name
//         ),
//         likedComments (
//           id,
//           user_id,
//           like
//         )
//       `)
//       .eq("video_id", video_id);

//     if (error || status !== 200) {
//       throw new Error(error?.message || "Error fetching comments");
//     }
//     return { commentsWithProfile: data as CommentWithProfile[], loading: false, error: null };
//   } catch (error: any) {
//     return { commentsWithProfile: null, loading: false, error: { message: error.message } as PostgrestError };
//   }
// }

// export async function addComment(comment: TablesInsert<"comment">) {
//   const { data, error } = await supabase
//     .from("comment")
//     .insert([comment])
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function updateComment(id: string, text: string) {
//   const { data, error } = await supabase
//     .from("comment")
//     .update({ text })
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function deleteComment(id: string) {
//   const { data, error } = await supabase
//     .from("comment")
//     .delete()
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// // Likes on comments
// export async function addLikeOnComment(like: TablesInsert<"likedComments">) {
//   const { data, error } = await supabase
//     .from("likedComments")
//     .insert([like])
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function removeLikeOnComment(id: string) {
//   const { data, error } = await supabase
//     .from("likedComments")
//     .delete()
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function modifyLikeOnComment(id: string, like: boolean) {
//   const { data, error } = await supabase
//     .from("likedComments")
//     .update({ like })
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// Chatgpt code below:-
// src/modules/comment.ts
// import { supabase } from '../components/utils/supabase';
// import type { TablesInsert, TablesUpdate } from '../../lib/database.types';
// import type { CommentWithProfile, LoadCommentsResponse } from '../types/VideoLoadTypes';
// import type { PostgrestError } from '@supabase/supabase-js';

// export async function loadCommentsByVideoId(video_id: string): Promise<LoadCommentsResponse> {
//   const { data, error, status } = await supabase
//     .from('comment')
//     .select(`
//       id, text, created_at, user_id, video_id, likeCount, dislikeCount,
//       profiles (id, username, avatar_url, updated_at, full_name),
//       likedComments (id, user_id, like)
//     `)
//     .eq('video_id', video_id);

//   if (error || status !== 200 || !Array.isArray(data)) {
//     return {
//       commentsWithProfile: [],
//       loading: false,
//       error: error ?? { message: 'Error fetching comments' } as PostgrestError,
//     };
//   }

//   return { commentsWithProfile: data as CommentWithProfile[], loading: false, error: null };
// }

// src/services/commentService.ts
// 

import { TablesInsert, TablesUpdate } from "../../lib/database.types";
import { supabase } from "../components/utils/supabase";
import { Comment, LoadCommentsResponse, CommentWithProfile, LikedComment } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const commentService = {
  async fetchCommentsByVideoId(videoId: string): Promise<LoadCommentsResponse> {
    const { data, error } = await supabase
      .from("comment")
      .select("*, profiles(*)")
      .eq("video_id", videoId)
      .order("created_at", { ascending: true });

    if (error || !Array.isArray(data)) {
      return {
        commentsWithProfile: null,
        error: error ?? { message: 'Error fetching comments' } as PostgrestError,
        loading: false,
      };
    }

    const comments = data.map((comment: any) => ({
      ...comment,
      likedComments: comment.likedComments || [],
    })) as CommentWithProfile[];

    return { commentsWithProfile: comments, error: null, loading: false };
  },

  async likeComment(userId: string, commentId: string, liked: boolean): Promise<{ likedComment: LikedComment | null; error: PostgrestError | null }> {
    const { data, error } = await supabase.from("likedComments").upsert(
      {
        user_id: userId,
        comment_id: commentId,
        like: liked,
      },
      { onConflict: 'comment_id' }
    ).single();

    return {
      likedComment: data ?? null,
      error: error ?? null,
    };
  },

  async addComment(comment: TablesInsert<'comment'>): Promise<Comment | null> {
    const { data, error } = await supabase.from("comment").insert([comment]).select().single();
    if (error || !data) throw error ?? new Error('Failed adding comment');
    return data as Comment;
  },

  async updateComment(id: string, text: string): Promise<Comment | null> {
    const { data, error } = await supabase
      .from('comment')
      .update({ text } as TablesUpdate<'comment'>)
      .eq('id', id)
      .select()
      .single();
    if (error || !data) throw error ?? new Error('Failed updating comment');
    return data as Comment;
  },

  async deleteComment(id: string): Promise<Comment | null> {
    const { data, error } = await supabase
      .from('comment')
      .delete()
      .eq('id', id)
      .select()
      .single();
    if (error || !data) throw error ?? new Error('Failed deleting comment');
    return data as Comment;
  },

  async addLikeOnComment(like: TablesInsert<'likedComments'>): Promise<LikedComment | null> {
    const { data, error } = await supabase.from('likedComments').insert([like]).select().single();
    if (error || !data) throw error ?? new Error('Failed adding like');
    return data as LikedComment;
  },

  async removeLikeOnComment(id: string): Promise<LikedComment | null> {
    const { data, error } = await supabase.from('likedComments').delete().eq('id', id).select().single();
    if (error || !data) throw error ?? new Error('Failed removing like');
    return data as LikedComment;
  },

  async modifyLikeOnComment(id: string, like: boolean): Promise<LikedComment | null> {
    const { data, error } = await supabase
      .from('likedComments')
      .update({ like })
      .eq('id', id)
      .select()
      .single();
    if (error || !data) throw error ?? new Error('Failed modifying like');
    return data as LikedComment;
  },
};

