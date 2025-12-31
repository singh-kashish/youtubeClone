import { useCallback, useEffect, useState } from "react";
import {
  getLikedVideosByVideoId,
} from "../../supabase/queries";
import {
  addLikeOnVideo,
  updateLikeOnVideo,
  removeLikeOnVideo,
} from "../../supabase/mutations";

export function useLikes(videoId: string, userId?: string) {
  const [likes, setLikes] = useState({
    totalLikes: 0,
    totalDislikes: 0,
    userVote: null as null | { liked: boolean; id: string },
  });

  const fetchLikes = useCallback(async () => {
    if (!videoId) return;

    const { data } = await getLikedVideosByVideoId(videoId);

    if (!data) return;

    const totalLikes = data.filter((l: any) => l.liked).length;
    const totalDislikes = data.filter((l: any) => !l.liked).length;

    const userVote = userId
      ? data.find((l: any) => l.user_id === userId) ?? null
      : null;

    setLikes({
      totalLikes,
      totalDislikes,
      userVote,
    });
  }, [videoId, userId]);

  const toggleLike = async (liked: boolean) => {
    if (!userId) return;

    // optimistic update
    setLikes((prev) => ({
      totalLikes:
        liked
          ? prev.totalLikes + (prev.userVote ? 0 : 1)
          : prev.totalLikes - (prev.userVote?.liked ? 1 : 0),
      totalDislikes:
        !liked
          ? prev.totalDislikes + (prev.userVote ? 0 : 1)
          : prev.totalDislikes - (!prev.userVote?.liked ? 1 : 0),
      userVote: { liked, id: prev.userVote?.id || "temp" },
    }));

    if (!likes.userVote) {
      await addLikeOnVideo(
        { video_id: videoId, user_id: userId, liked },
        fetchLikes
      );
    } else {
      await updateLikeOnVideo(likes.userVote.id, liked, fetchLikes);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return {
    likes,
    toggleLike,
  };
}
