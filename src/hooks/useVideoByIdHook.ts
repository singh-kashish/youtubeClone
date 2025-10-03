import { useState, useEffect } from 'react';
import { loadVideoById, incrementVideoViewCount } from '../modules/loadVideoById';
import { getLikesByVideo, addLikeOnVideo, modifyLikeOnVideo, removeLikeOnVideo } from '../modules/like';
import {
  getTotalSubscriberCountByProfile,
  addSubscriber,
  deleteSubscriber,
  currentUserSubscribedToProfile
} from '../modules/subscriber';
import { CommentWithProfile, VideoWithProfile } from '../types/VideoLoadTypes';
import { Subscriber } from '../types/Subscriber';
import { toast } from 'react-hot-toast';

interface LikesState {
  totalLikes: number;
  totalDislikes: number;
  userVote: { id: string; liked: boolean } | null;
}

export function useVideoById(videoId?: string, user?: { id: string }) {
  const [video, setVideo] = useState<VideoWithProfile | null>(null);
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [likes, setLikes] = useState<LikesState>({
    totalLikes: 0,
    totalDislikes: 0,
    userVote: null,
  });
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [subscriberId, setSubscriberId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        if (!videoId) {
          setVideo(null);
          setComments([]);
          setLikes({ totalLikes: 0, totalDislikes: 0, userVote: null });
          setSubscriberCount(0);
          setSubscribed(false);
          setSubscriberId(null);
          setLoading(false);
          return;
        }

        // Load video
        const { VideoWithProfile } = await loadVideoById(videoId);
        if (!VideoWithProfile) throw new Error("Video not found.");
        if (cancelled) return;
        setVideo(VideoWithProfile);

        // Set comments
        setComments(VideoWithProfile.comment || []);

        // Likes
        const likeRows = await getLikesByVideo(videoId);
        if (cancelled) return;
        const totalLikes = likeRows.filter(v => v.liked === true).length;
        const totalDislikes = likeRows.filter(v => v.liked === false).length;

        let userVote: LikesState['userVote'] = null;
        if (user?.id) {
          const uv = likeRows.find(v => v.user_id === user.id);
          if (uv && typeof uv.liked === 'boolean') {
            userVote = { id: uv.id, liked: uv.liked };
          }
        }

        setLikes({ totalLikes, totalDislikes, userVote });

        // Subscribers
        const profileId = VideoWithProfile.profiles?.id;
        if (profileId) {
          const count = await getTotalSubscriberCountByProfile(profileId);
          if (cancelled) return;
          setSubscriberCount(count);

          if (user?.id) {
            const { isSubscribed, subscribedId } = await currentUserSubscribedToProfile(user.id, profileId);
            if (cancelled) return;
            setSubscribed(isSubscribed);
            setSubscriberId(subscribedId);
          }
        }

        // Increment views
        await incrementVideoViewCount(videoId, VideoWithProfile.viewCount || 0);
        if (cancelled) return;
        setVideo(prev =>
          prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : prev
        );
      } catch (err: any) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [videoId, user?.id]);

  const toggleLike = async (isLike: boolean) => {
    if (!videoId || !user) {
      toast.error("You need to log in to like or dislike a video.");
      return;
    }

    if (likes.userVote) {
      if (likes.userVote.liked === isLike) {
        try {
          await removeLikeOnVideo(likes.userVote.id);
          setLikes(prev => {
            if (!prev.userVote) return prev;
            return {
              ...prev,
              totalLikes: isLike ? Math.max(0, prev.totalLikes - 1) : prev.totalLikes,
              totalDislikes: !isLike ? Math.max(0, prev.totalDislikes - 1) : prev.totalDislikes,
              userVote: null,
            };
          });
          toast.success(`${isLike ? 'Like' : 'Dislike'} removed.`);
        } catch {
          toast.error("Failed to remove vote.");
        }
      } else {
        await modifyLikeOnVideo(likes.userVote.id, isLike);
        setLikes(prev => {
          let { totalLikes, totalDislikes } = prev;
          if (isLike) {
            totalLikes += 1;
            totalDislikes = Math.max(0, totalDislikes - 1);
          } else {
            totalDislikes += 1;
            totalLikes = Math.max(0, totalLikes - 1);
          }
          return {
            ...prev,
            totalLikes,
            totalDislikes,
            userVote: { id: prev.userVote!.id, liked: isLike },
          };
        });
      }
    } else {
      const newEntry = await addLikeOnVideo({ video_id: videoId, user_id: user.id, liked: isLike });
      setLikes(prev => ({
        totalLikes: prev.totalLikes + (isLike ? 1 : 0),
        totalDislikes: prev.totalDislikes + (!isLike ? 1 : 0),
        userVote: { id: newEntry.id, liked: isLike },
      }));
    }
  };

  const toggleSubscribe = async () => {
    if (!video?.profiles?.id || !user?.id) return;

    try {
      if (subscribed && subscriberId) {
        await deleteSubscriber(subscriberId);
        setSubscribed(false);
        setSubscriberId(null);
        setSubscriberCount(c => Math.max(0, c - 1));
        toast.success("You have unsubscribed.");
      } else {
        const newSub: Subscriber = await addSubscriber({
          user_id: user.id,
          subscribed_to_id: video.profiles.id,
        });
        setSubscribed(true);
        setSubscriberId(newSub.id);
        setSubscriberCount(c => c + 1);
        toast.success("You are now subscribed.");
      }
    } catch {
      toast.error("Error toggling subscription.");
    }
  };

  return {
    video,
    comments,
    likes,
    subscriberCount,
    subscribed,
    toggleLike,
    toggleSubscribe,
    setComments,
    loading,
    error,
  };
}
