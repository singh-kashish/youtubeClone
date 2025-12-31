import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { addComment } from "../../supabase/mutations";

export function useComments(videoId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchComments = useCallback(async () => {
    if (!videoId) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        text,
        created_at,
        user_id,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq("video_id", videoId)
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setComments(data ?? []);
  }, [videoId]);

  const createComment = async (payload: {
    video_id: string;
    user_id: string;
    content: string;
  }) => {
    const optimisticId = crypto.randomUUID();

    const optimisticComment = {
      id: optimisticId,
      text: payload.content,
      user_id: payload.user_id,
      created_at: new Date().toISOString(),
      profiles: null, // optional placeholder
      __optimistic: true,
    };

    // optimistic insert
    setComments(prev => [optimisticComment, ...prev]);

    const { data, error } = await addComment({
      video_id: payload.video_id,
      user_id: payload.user_id,
      text: payload.content,
    });

    if (error) {
      // rollback optimistic comment
      setComments(prev =>
        prev.filter(comment => comment.id !== optimisticId)
      );
      throw error;
    }

    // reconcile with real data
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    createComment,
    refetchComments: fetchComments,
  };
}
