// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";
// import { Comment, LoadCommentsResponse,CommentWithProfile } from "./VideoLoadTypes";

// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export interface LoadLikedCommentResponse {
//   comment: LikedComment | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// src/types/Comment.ts
// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";
// import { Comment, CommentWithProfile } from "./VideoLoadTypes";

// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export interface LoadLikedCommentResponse {
//   comment: LikedComment | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

//chatgpt code below:-
import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { LikedComment } from "./VideoLoadTypes";

export type Comment = Database["public"]["Tables"]["comment"]["Row"];

export interface LoadLikedCommentResponse {
  comment: LikedComment | null;
  error: PostgrestError | null;
  loading: boolean;
}
