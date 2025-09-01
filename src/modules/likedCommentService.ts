// import { supabase } from "../components/utils/supabase";
// import { LikedComment } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export const likedCommentsService = {
//   async getLikedComment(user_id: string, comment_id: string): Promise<{ comment: LikedComment | null; error: PostgrestError | null; loading: boolean }> {
//     const { data, error } = await supabase
//       .from("likedComments")
//       .select("*")
//       .match({ user_id, comment_id })
//       .single();

//     return {
//       comment: data ?? null,
//       error,
//       loading: false,
//     };
//   },

//   async updateLikedComment(data: Omit<LikedComment, "id" | "created_at">): Promise<{ error: PostgrestError | null }> {
//     // Delete existing row
//     await supabase.from("likedComments").delete().match({ user_id: data.user_id, comment_id: data.comment_id });

//     // Insert new row
//     const { error } = await supabase.from("likedComments").insert([data]);
//     return { error };
//   },

//   async deleteLikedComment(id: string): Promise<{ error: PostgrestError | null }> {
//     const { error } = await supabase.from("likedComments").delete().eq("id", id);
//     return { error };
//   },
// };

// import { supabase } from "../components/utils/supabase";
// import { LikedComment } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export const likedCommentsService = {
//   async getLikedComment(user_id: string, comment_id: string): Promise<{ comment: LikedComment | null; error: PostgrestError | null; loading: boolean }> {
//     const { data, error } = await supabase.from("likedComments").select("*").match({ user_id, comment_id }).single();
//     return {
//       comment: data ?? null,
//       error,
//       loading: false,
//     };
//   },

//   async updateLikedComment(data: Omit<LikedComment, "id" | "created_at">): Promise<{ error: PostgrestError | null }> {
//     // delete existing to avoid onConflict errors
//     await supabase.from("likedComments").delete().match({ user_id: data.user_id, comment_id: data.comment_id });
//     const { error } = await supabase.from("likedComments").insert([data]);
//     return { error };
//   },

//   async deleteLikedComment(id: string): Promise<{ error: PostgrestError | null }> {
//     const { error } = await supabase.from("likedComments").delete().eq("id", id);
//     return { error };
//   },
// };

import { supabase } from "../components/utils/supabase";
import { LikedComment } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const likedCommentsService = {
  async getLikedComment(user_id: string, comment_id: string): Promise<{ comment: LikedComment | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("liked_comments")
      .select("*")
      .eq("user_id", user_id)
      .eq("comment_id", comment_id)
      .single();

    return {
      comment: data ?? null,
      error,
    };
  },
};
