// src/hooks/useLikedComments.ts
import { useState, useEffect } from "react";
//import { likedCommentsService } from "../modules/likedCommentService";
import { LikedComment } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

interface UseLikedCommentReturn {
  likedComment: LikedComment | null;
  loading: boolean;
  error: PostgrestError | null;
}

export function useLikedComment(user_id: string, comment_id: string): UseLikedCommentReturn {
  const [likedComment, setLikedComment] = useState<LikedComment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      //const res = await likedCommentsService.getLikedComment(user_id, comment_id);
      // setLikedComment(res.comment);
      // setError(res.error);
      // setLoading(false);
    }
    if (user_id && comment_id) fetch();
  }, [user_id, comment_id]);

  return { likedComment, loading, error };
}
