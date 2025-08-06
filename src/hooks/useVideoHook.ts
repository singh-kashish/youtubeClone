import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { supabase } from "../components/utils/supabase";
import { useRouter } from "next/navigation";
import { VideoWithProfile, Comment } from "../types/VideoLoadTypes";
import { loadVideoById } from "../modules/loadVideoById";

/**
 * Custom hook to manage video-related state and actions using Supabase-js.
 * @param user The current authenticated user.
 * @param video_id The ID of the video to load, which can be a string, string array, or undefined.
 * @returns An object containing video data, loading state, error, and action handlers.
 */
const useVideoHook = (user: any, video_id: string | string[] | undefined) => {
  const router = useRouter();
  const [video, setVideo] = useState<VideoWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [likedId, setLikedId] = useState<string | undefined>(undefined);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedId, setSubscribedId] = useState<string | undefined>(undefined);
  const [viewsChanged, setViewsChanged] = useState(false);
  const [likeData, setLikeData] = useState<any[]>([]);

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      if (!video_id) {
        setError({ message: "Video ID is missing" });
        setLoading(false);
        return;
      }

      const videoIdString = Array.isArray(video_id) ? video_id[0] : video_id;
      if (!videoIdString) {
        setError({ message: "Invalid video ID" });
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await loadVideoById(videoIdString);
      setLoading(false);

      if (response.error) {
        setError(response.error);
        setVideo(null);
      } else {
        const videoData = response.VideoWithProfile || null;
        if (videoData) {
          videoData.profiles = videoData.profiles || null;
          videoData.comment = videoData.comment || [];
        }
        setVideo(videoData);
        setError(null);
      }
    };

    fetchVideo();
  }, [video_id]);

  // Fetch likes/dislikes for the video
  useEffect(() => {
    const fetchLikes = async () => {
      if (!video_id) return;

      const videoIdString = Array.isArray(video_id) ? video_id[0] : video_id;
      if (!videoIdString) return;

      const { data, error } = await supabase
        .from("likedVideos")
        .select("id, user_id, liked")
        .eq("video_id", videoIdString);

      if (error) {
        console.error("Error fetching likes:", error);
        toast.error("Failed to load likes");
        return;
      }

      setLikeData(data || []);
      const userLike: { id: string; user_id: string | null; liked: boolean | null } | undefined = data?.find(
        (vote: any) => vote.user_id === user?.id
      );
      setLiked(userLike?.liked ?? undefined);
      setLikedId(userLike?.id);
    };

    fetchLikes();
  }, [video_id, user]);

  // Update view count on video open
  useEffect(() => {
    const updateViewCount = async () => {
      if (!video || viewsChanged) return;

      const prevViewCount = video.viewCount || 0;
      const newViewCount = prevViewCount + 1;

      const { error } = await supabase
        .from("video")
        .update({ viewCount: newViewCount })
        .eq("id", video.id);

      if (error) {
        console.error("Error updating view count:", error);
        toast.error("Error updating view count!");
      } else {
        setVideo((prev: VideoWithProfile | null) => (prev ? { ...prev, viewCount: newViewCount } : null));
        setViewsChanged(true);
        toast.success("View count updated!");
      }
    };

    updateViewCount();
  }, [video, viewsChanged]);

  // Check subscription status
  useEffect(() => {
    if (!video || !user || !video.profiles) {
      setSubscribed(false);
      setSubscribedId(undefined);
      return;
    }

    const subs = video.profiles.subscribers || [];
    const subbed = subs.find((sub: any) => sub.user_id === user?.id) !== undefined;
    const subbedId = subs.find((sub: any) => sub.user_id === user?.id)?.id;
    setSubscribed(subbed);
    setSubscribedId(subbedId);
  }, [video, user]);

  // Mutation: Like or unlike a video
  const useUpVote = async (typeOfLike: boolean) => {
    if (!user) {
      toast.error("Hey, you need to sign in to vote!");
      return;
    }

    const videoIdString = Array.isArray(video_id) ? video_id[0] : video_id;
    if (!videoIdString) {
      toast.error("Invalid video ID!");
      return;
    }

    try {
      if (liked === typeOfLike) {
        const { error } = await supabase
          .from("likedVideos")
          .delete()
          .eq("id", likedId);

        if (error) throw new Error(`Error removing your ${typeOfLike ? "like" : "unlike"}: ${error.message}`);

        setLikeData((prev) => prev.filter((vote) => vote.id !== likedId));
        setLiked(undefined);
        setLikedId(undefined);
        toast.success(`Your ${typeOfLike ? "like" : "unlike"} was removed!`);
        return;
      }

      if (liked !== undefined) {
        const { error } = await supabase
          .from("likedVideos")
          .update({ liked: typeOfLike })
          .eq("id", likedId);

        if (error) throw new Error(`Error changing to ${typeOfLike ? "like" : "unlike"}: ${error.message}`);

        setLikeData((prev) =>
          prev.map((vote) => (vote.id === likedId ? { ...vote, liked: typeOfLike } : vote))
        );
        setLiked(typeOfLike);
        toast.success(`Changed to ${typeOfLike ? "like" : "unlike"}!`);
        return;
      }

      const { data, error } = await supabase
        .from("likedVideos")
        .insert({ video_id: videoIdString, user_id: user.id, liked: typeOfLike })
        .select()
        .single();

      if (error) throw new Error(`Error adding your ${typeOfLike ? "like" : "unlike"}: ${error.message}`);

      setLikeData((prev) => [...prev, data]);
      setLiked(typeOfLike);
      setLikedId(data.id);
      toast.success(`Your ${typeOfLike ? "like" : "unlike"} was added!`);
    } catch (error: unknown) {
      console.error("Error in useUpVote:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  // Mutation: Subscribe or unsubscribe to/from a profile
  const subscribe = async () => {
    if (!user) {
      toast.error("Hey, you need to sign in to subscribe!");
      return;
    }

    if (!video || !video.user_id) {
      toast.error("Cannot subscribe: Video owner not found!");
      return;
    }

    try {
      if (subscribed) {
        const { error } = await supabase
          .from("subscribers")
          .delete()
          .eq("id", subscribedId);

        if (error) throw new Error(`Error unsubscribing: ${error.message}`);

        setSubscribed(false);
        setSubscribedId(undefined);
        toast.success("Unsubscribed successfully!");
      } else {
        const { data, error } = await supabase
          .from("subscribers")
          .insert({ user_id: user.id, subscribed_to_id: video.user_id })
          .select()
          .single();

        if (error) throw new Error(`Error subscribing: ${error.message}`);

        setSubscribed(true);
        setSubscribedId(data.id);
        toast.success("Subscribed successfully!");
      }
    } catch (error: unknown) {
      console.error("Error in subscribe:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  // Utility: Refresh video data
  const refreshVideo = useCallback(async () => {
    if (!video_id) return;

    const videoIdString = Array.isArray(video_id) ? video_id[0] : video_id;
    if (!videoIdString) return;

    const response = await loadVideoById(videoIdString);
    if (response.error) {
      setError(response.error);
      setVideo(null);
    } else {
      const videoData = response.VideoWithProfile || null;
      if (videoData) {
        videoData.profiles = videoData.profiles || null;
        videoData.comment = videoData.comment || [];
      }
      setVideo(videoData);
      setError(null);
    }
  }, [video_id]);

  // Utility: Optimistically add a comment
  const addCommentOptimistically = (newComment: Comment) => {
    setVideo((prev: VideoWithProfile | null) => {
      if (!prev) return null;
      const updatedComments = [...(prev.comment || []), newComment];
      return { ...prev, comment: updatedComments };
    });
  };

  // Utility: Display total likes
  const displayLikes = (data: any[]): number => {
    return data.reduce((total, vote) => (vote.liked ? total + 1 : total), 0) || 0;
  };

  // Utility: Display total unlikes
  const displayUnlikes = (data: any[]): number => {
    return data.reduce((total, vote) => (vote.liked === false ? total + 1 : total), 0) || 0;
  };

  // Handle video end (placeholder for playlist navigation)
  const onVideoEnd = () => {
    console.log("Video ended. Implement playlist navigation here.");
  };

  return {
    video,
    loading,
    error,
    liked,
    subscribed,
    likeData,
    useUpVote,
    subscribe,
    refreshVideo,
    addCommentOptimistically,
    displayLikes,
    displayUnlikes,
    onVideoEnd,
  };
};

export default useVideoHook;