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

// import { TablesInsert, TablesUpdate } from "../../lib/database.types";
// import { supabase } from "../components/utils/supabase";
// import { Comment, LoadCommentsResponse, CommentWithProfile, LikedComment } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export const commentService = {
  
//   async fetchCommentsByVideoId(videoId: string): Promise<LoadCommentsResponse> {
//     const { data, error } = await supabase
//       .from("comment")
//       .select(`
//         id, text, created_at, user_id, video_id, likeCount, dislikeCount,
//         profiles ( id, username, avatar_url, updated_at, full_name ),
//         likedComments ( id, user_id, like )
//       `)
//       .eq("video_id", videoId)
//       .order("created_at", { ascending: true });

//     if (error) {
//       return { commentsWithProfile: null, error, loading: false };
//     }

//     // Supabase returns [] when no comments; normalize to array
//     const comments = (data ?? []) as CommentWithProfile[];
//     return { commentsWithProfile: comments, error: null, loading: false };
//   },

//   async likeComment(userId: string, commentId: string, liked: boolean): Promise<{ likedComment: LikedComment | null; error: PostgrestError | null }> {
//     const { data, error } = await supabase.from("likedComments").upsert(
//       {
//         user_id: userId,
//         comment_id: commentId,
//         like: liked,
//       },
//       { onConflict: 'comment_id' }
//     ).single();

//     return {
//       likedComment: data ?? null,
//       error: error ?? null,
//     };
//   },

//   async addComment(comment: TablesInsert<'comment'>): Promise<Comment | null> {
//     const { data, error } = await supabase.from("comment").insert([comment]).select().single();
//     if (error || !data) throw error ?? new Error('Failed adding comment');
//     return data as Comment;
//   },

//   async updateComment(id: string, text: string): Promise<Comment | null> {
//     const { data, error } = await supabase
//       .from('comment')
//       .update({ text } as TablesUpdate<'comment'>)
//       .eq('id', id)
//       .select()
//       .single();
//     if (error || !data) throw error ?? new Error('Failed updating comment');
//     return data as Comment;
//   },

//   async deleteComment(id: string): Promise<Comment | null> {
//     const { data, error } = await supabase
//       .from('comment')
//       .delete()
//       .eq('id', id)
//       .select()
//       .single();
//     if (error || !data) throw error ?? new Error('Failed deleting comment');
//     return data as Comment;
//   },

//   async addLikeOnComment(like: TablesInsert<'likedComments'>): Promise<LikedComment | null> {
//     const { data, error } = await supabase.from('likedComments').insert([like]).select().single();
//     if (error || !data) throw error ?? new Error('Failed adding like');
//     return data as LikedComment;
//   },

//   async removeLikeOnComment(id: string): Promise<LikedComment | null> {
//     const { data, error } = await supabase.from('likedComments').delete().eq('id', id).select().single();
//     if (error || !data) throw error ?? new Error('Failed removing like');
//     return data as LikedComment;
//   },

//   async modifyLikeOnComment(id: string, like: boolean): Promise<LikedComment | null> {
//     const { data, error } = await supabase
//       .from('likedComments')
//       .update({ like })
//       .eq('id', id)
//       .select()
//       .single();
//     if (error || !data) throw error ?? new Error('Failed modifying like');
//     return data as LikedComment;
//   },
// };

// src/modules/comment.ts
import { TablesInsert, TablesUpdate } from "../../lib/database.types";
import { supabase } from "../components/utils/supabase";
import {
  CommentWithProfile,
  LikedComment,
  LoadCommentsResponse,
} from "../types/AppTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const commentService = {
  async fetchCommentsByVideoId(videoId: string): Promise<LoadCommentsResponse> {
    const { data, error } = await supabase
      .from("comment")
      .select(`
        id, text, created_at, user_id, video_id, likeCount, dislikeCount,
        profiles:profiles ( id, username, avatar_url, updated_at, full_name ),
        likedComments:likedComments ( id, user_id, comment_id, like, created_at )
      `)
      .eq("video_id", videoId)
      .order("created_at", { ascending: true });

    if (error) {
      return { commentsWithProfile: null, error, loading: false };
    }

    const comments = (data ?? []).map((c: any) => {
      const profile = c.profiles
        ? {
            id: c.profiles.id,
            username: c.profiles.username,
            full_name: c.profiles.full_name,
            avatar_url: c.profiles.avatar_url,
            updated_at: c.profiles.updated_at ?? null,
          }
        : null;

      return {
        id: c.id,
        text: c.text,
        created_at: c.created_at ?? null,
        user_id: c.user_id,
        video_id: c.video_id,
        likeCount: typeof c.likeCount === "number" ? c.likeCount : 0,
        dislikeCount: typeof c.dislikeCount === "number" ? c.dislikeCount : 0,
        profiles: profile,
        likedComments: Array.isArray(c.likedComments) ? c.likedComments : null,
      } as CommentWithProfile;
    });

    return { commentsWithProfile: comments, error: null, loading: false };
  },

  async addComment(comment: TablesInsert<"comment">): Promise<CommentWithProfile> {
    const { data, error } = await supabase
      .from("comment")
      .insert([comment])
      .select(`
        id, text, created_at, user_id, video_id, likeCount, dislikeCount,
        profiles:profiles ( id, username, avatar_url, updated_at, full_name ),
        likedComments:likedComments ( id, user_id, comment_id, like, created_at )
      `)
      .single();

    if (error || !data) throw error ?? new Error("Failed adding comment");

    const c: any = data;
    const profile = c.profiles
      ? {
          id: c.profiles.id,
          username: c.profiles.username,
          full_name: c.profiles.full_name,
          avatar_url: c.profiles.avatar_url,
          updated_at: c.profiles.updated_at ?? null,
        }
      : null;

    return {
      id: c.id,
      text: c.text,
      created_at: c.created_at ?? null,
      user_id: c.user_id,
      video_id: c.video_id,
      likeCount: typeof c.likeCount === "number" ? c.likeCount : 0,
      dislikeCount: typeof c.dislikeCount === "number" ? c.dislikeCount : 0,
      profiles: profile,
      likedComments: Array.isArray(c.likedComments) ? c.likedComments : [],
    };
  },

  async updateComment(id: string, text: string): Promise<CommentWithProfile> {
    const { data, error } = await supabase
      .from("comment")
      .update({ text } as TablesUpdate<"comment">)
      .eq("id", id)
      .select(`
        id, text, created_at, user_id, video_id, likeCount, dislikeCount,
        profiles:profiles ( id, username, avatar_url, updated_at, full_name ),
        likedComments:likedComments ( id, user_id, comment_id, like, created_at )
      `)
      .single();

    if (error || !data) throw error ?? new Error("Failed updating comment");

    const c: any = data;
    const profile = c.profiles
      ? {
          id: c.profiles.id,
          username: c.profiles.username,
          full_name: c.profiles.full_name,
          avatar_url: c.profiles.avatar_url,
          updated_at: c.profiles.updated_at ?? null,
        }
      : null;

    return {
      id: c.id,
      text: c.text,
      created_at: c.created_at ?? null,
      user_id: c.user_id,
      video_id: c.video_id,
      likeCount: typeof c.likeCount === "number" ? c.likeCount : 0,
      dislikeCount: typeof c.dislikeCount === "number" ? c.dislikeCount : 0,
      profiles: profile,
      likedComments: Array.isArray(c.likedComments) ? c.likedComments : [],
    };
  },

  async deleteComment(id: string): Promise<{ id: string }> {
    const { data, error } = await supabase
      .from("comment")
      .delete()
      .eq("id", id)
      .select("id")
      .single();

    if (error || !data) throw error ?? new Error("Failed deleting comment");
    return { id: data.id as string };
  },

  async likeComment(
    userId: string,
    commentId: string,
    liked: boolean
  ): Promise<{ likedComment: LikedComment | null; error: PostgrestError | null }> {
    // Requires a unique composite constraint on (user_id, comment_id)
    const { data, error } = await supabase
      .from("likedComments")
      .upsert(
        { user_id: userId, comment_id: commentId, like: liked },
        { onConflict: "user_id,comment_id" }
      )
      .select()
      .single();

    return {
      likedComment: (data as LikedComment) ?? null,
      error: error ?? null,
    };
  },

  async removeLikeOnComment(id: string): Promise<LikedComment> {
    const { data, error } = await supabase
      .from("likedComments")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error || !data) throw error ?? new Error("Failed removing like");
    return data as LikedComment;
  },

  async modifyLikeOnComment(id: string, like: boolean): Promise<LikedComment> {
    const { data, error } = await supabase
      .from("likedComments")
      .update({ like })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) throw error ?? new Error("Failed modifying like");
    return data as LikedComment;
  },
};
