// // src/hooks/useVideoByIdHook.ts
// import { useState, useEffect } from 'react';
// import { loadVideoById, incrementVideoViewCount } from '../modules/loadVideoById';
// import { loadCommentsByVideoId } from '../modules/comment';
// import { getLikesByVideo, addLikeOnVideo, modifyLikeOnVideo } from '../modules/like';
// import { getTotalSubscriberCountByProfile, addSubscriber, deleteSubscriber, currentUserSubscribedToProfile } from '../modules/subscriber';
// import { CommentWithProfile, VideoWithProfile } from '../types/VideoLoadTypes';
// import { toast } from 'react-hot-toast';

// interface LikesState {
//   totalLikes: number;
//   totalDislikes: number;
//   userVote: { id: string; liked: boolean } | undefined;
// }

// export function useVideoById(videoId?: string, user?: { id: string }) {
//   const [video, setVideo] = useState<VideoWithProfile | null>(null);
//   const [comments, setComments] = useState<CommentWithProfile[]>([]);
//   const [likes, setLikes] = useState<LikesState>({ totalLikes: 0, totalDislikes: 0, userVote: undefined });
//   const [subscriberCount, setSubscriberCount] = useState<number>(0);
//   const [subscribed, setSubscribed] = useState<boolean>(false);
//   const [subscribedId, setSubscribedId] = useState<string | undefined>(undefined);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     async function fetchData() {
//       setLoading(true);
//       setError(null);

//       if (!videoId) {
//         setVideo(null);
//         setComments([]);
//         setLikes({ totalLikes: 0, totalDislikes: 0, userVote: undefined });
//         setSubscriberCount(0);
//         setSubscribed(false);
//         setSubscribedId(undefined);
//         setLoading(false);
//         return;
//       }

//       try {
//         const { VideoWithProfile } = await loadVideoById(videoId);
//         if (!VideoWithProfile) throw new Error("Video not found.");
//         if (cancelled) return;
//         setVideo(VideoWithProfile);

//         // Comments
//         const { commentsWithProfile } = await loadCommentsByVideoId(videoId);
//         if (cancelled) return;
//         setComments(commentsWithProfile || []);

//         // Likes
//         const likeRows = await getLikesByVideo(videoId);
//         if (cancelled) return;
//         const totalLikes = likeRows.filter(v => v.liked === true).length;
//         const totalDislikes = likeRows.filter(v => v.liked === false).length;
//         let userVote: LikesState['userVote'] = undefined;
//         if (user?.id) {
//           const uv = likeRows.find(v => v.user_id === user.id);
//           if (uv && typeof uv.liked === 'boolean') {
//             userVote = { id: uv.id, liked: uv.liked };
//           }
//         }
//         setLikes({ totalLikes, totalDislikes, userVote });

//         // Subscribers
//         if (VideoWithProfile?.profiles?.id) {
//           const count = await getTotalSubscriberCountByProfile(VideoWithProfile.profiles.id);
//           if (cancelled) return;
//           setSubscriberCount(count);

//           if (user?.id) {
//             const { isSubscribed, subscribedId } = await currentUserSubscribedToProfile(user.id, VideoWithProfile.profiles.id);
//             if (cancelled) return;
//             setSubscribed(isSubscribed);
//             setSubscribedId(subscribedId);
//           }
//         }

//         // Increment views
//         await incrementVideoViewCount(videoId, VideoWithProfile.viewCount || 0);
//         if (cancelled) return;
//         setVideo(prev => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : prev));
//       } catch (err: any) {
//         if (!cancelled) {
//           setError(err instanceof Error ? err : new Error(String(err)));
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     fetchData();
//     return () => { cancelled = true; };
//   }, [videoId, user]);

//   const toggleLike = async (isLike: boolean) => {
//     if (!videoId || !user) {
//       toast.error("You need to log in to like or dislike a video.");
//       return;
//     }
//     if (likes.userVote) {
//       await modifyLikeOnVideo(likes.userVote.id, isLike);
//       setLikes(prev => {
//         if (!prev.userVote) return prev;
//         let totalLikes = prev.totalLikes;
//         let totalDislikes = prev.totalDislikes;
//         if (prev.userVote.liked !== isLike) {
//           if (isLike) {
//             totalLikes += 1;
//             if (prev.userVote.liked === false) totalDislikes = Math.max(0, totalDislikes - 1);
//           } else {
//             totalDislikes += 1;
//             if (prev.userVote.liked === true) totalLikes = Math.max(0, totalLikes - 1);
//           }
//         }
//         return { ...prev, totalLikes, totalDislikes, userVote: { id: prev.userVote.id, liked: isLike } };
//       });
//     } else {
//       const newEntry = await addLikeOnVideo({ video_id: videoId, user_id: user.id, liked: isLike });
//       setLikes(prev => ({
//         totalLikes: prev.totalLikes + (isLike ? 1 : 0),
//         totalDislikes: prev.totalDislikes + (!isLike ? 1 : 0),
//         userVote: { id: newEntry.id, liked: isLike },
//       }));
//     }
//   };

//   const toggleSubscribe = async () => {
//     if (!video?.profiles?.id || !user) return;
//     if (subscribed && subscribedId) {
//       await deleteSubscriber(subscribedId);
//       setSubscriberCount(c => Math.max(0, c - 1));
//       setSubscribed(false);
//       setSubscribedId(undefined);
//     } else {
//       const data = await addSubscriber({ user_id: user.id, subscribed_to_id: video.profiles.id });
//       setSubscribedId(data.id);
//       setSubscriberCount(c => c + 1);
//       setSubscribed(true);
//     }
//   };

//   return {
//     video,
//     comments,
//     likes,
//     subscriberCount,
//     subscribed,
//     toggleLike,
//     toggleSubscribe,
//     setComments,
//     loading,
//     error,
//   };
// }

// import { useState, useEffect } from 'react';
// import { loadVideoById, incrementVideoViewCount } from '../modules/loadVideoById';
// import { getLikesByVideo, addLikeOnVideo, modifyLikeOnVideo } from '../modules/like';
// import { getTotalSubscriberCountByProfile, addSubscriber, deleteSubscriber} from '../modules/subscriber';
// import { CommentWithProfile, VideoWithProfile } from '../types/VideoLoadTypes';
// import { toast } from 'react-hot-toast';

// interface LikesState {
//   totalLikes: number;
//   totalDislikes: number;
//   userVote: { id: string; liked: boolean } | null | undefined;
// }

// export function useVideoById(videoId?: string, user?: { id: string }) {
//   const [video, setVideo] = useState<VideoWithProfile | null | undefined>(null);
//   const [comments, setComments] = useState<CommentWithProfile[] | [] | null >([]);
//   const [likes, setLikes] = useState<LikesState>({ totalLikes: 0, totalDislikes: 0, userVote: null });
//   const [subscriberCount, setSubscriberCount] = useState<number>(0);
//   const [subscribed, setSubscribed] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError(null);

//     async function fetchData() {
//       try {
//         if (!videoId) {
//           setVideo(null);
//           setComments([]);
//           setLikes({ totalLikes: 0, totalDislikes: 0, userVote: null });
//           setSubscriberCount(0);
//           setSubscribed(false);
//           setLoading(false);
//           return;
//         }
//         const { VideoWithProfile } = await loadVideoById(videoId);
//         if (!VideoWithProfile) throw new Error("Video not found.");
//         if (cancelled) return;
//         setVideo(VideoWithProfile);
//         console.log("Fetched video:", video);
//         setComments(video?.comment | []);
//         // const { commentsWithProfile } = await fetchCommentsByVideoId(videoId);
//         // if (cancelled) return;
//         // setComments(commentsWithProfile || []);
        

//         const likeRows = await getLikesByVideo(videoId);
//         if (cancelled) return;
//         const totalLikes = likeRows.filter(v => v.liked === true).length;
//         const totalDislikes = likeRows.filter(v => v.liked === false).length;
//         let userVote: LikesState['userVote'] = undefined;
//         if (user?.id) {
//           const uv = likeRows.find(v => v.user_id === user.id);
//           if (uv && typeof uv.liked === 'boolean') {
//             userVote = { id: uv.id, liked: uv.liked };
//           }
//         }
//         setLikes({ totalLikes, totalDislikes, userVote });

//         if (VideoWithProfile?.profiles?.id) {
//           const count = await getTotalSubscriberCountByProfile(VideoWithProfile.profiles.id);
//           if (cancelled) return;
//           setSubscriberCount(count);

//           if (user?.id) {
//             console.log("Checking subscription status for user:", user.id, "to profile:", VideoWithProfile.profiles.id);
//             // const { isSubscribed, subscribedId } = await currentUserSubscribedToProfile(user.id, VideoWithProfile.profiles.id);
//             // if (cancelled) return;
//             // setSubscribed(isSubscribed);
//             // setSubscribedId(subscribedId);
//           }
//         }

//         await incrementVideoViewCount(videoId, VideoWithProfile.viewCount || 0);
//         if (cancelled) return;
//         setVideo(prev => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : prev));
//       } catch (err: any) {
//         if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     fetchData();
//     return () => { cancelled = true; };
//   }, [videoId, user?.id]);

//   const toggleLike = async (isLike: boolean) => {
//     if (!videoId || !user) {
//       toast.error("You need to log in to like or dislike a video.");
//       return;
//     }
//     if (likes.userVote) {
//       await modifyLikeOnVideo(likes.userVote.id, isLike);
//       setLikes(prev => {
//         if (!prev.userVote) return prev;
//         let totalLikes = prev.totalLikes;
//         let totalDislikes = prev.totalDislikes;
//         if (prev.userVote.liked !== isLike) {
//           if (isLike) {
//             totalLikes += 1;
//             if (prev.userVote.liked === false) totalDislikes = Math.max(0, totalDislikes - 1);
//           } else {
//             totalDislikes += 1;
//             if (prev.userVote.liked === true) totalLikes = Math.max(0, totalLikes - 1);
//           }
//         }
//         return { ...prev, totalLikes, totalDislikes, userVote: { id: prev.userVote.id, liked: isLike } };
//       });
//     } else {
//       const newEntry = await addLikeOnVideo({ video_id: videoId, user_id: user.id, liked: isLike });
//       setLikes(prev => ({
//         totalLikes: prev.totalLikes + (isLike ? 1 : 0),
//         totalDislikes: prev.totalDislikes + (!isLike ? 1 : 0),
//         userVote: { id: newEntry.id, liked: isLike },
//       }));
//     }
//   };

//   const toggleSubscribe = async () => {
//     if (!video?.profiles?.id || !user) return;
//     if (subscribed && subscribedId) {
//       await deleteSubscriber(subscribedId);
//       setSubscriberCount(c => Math.max(0, c - 1));
//       setSubscribed(false);
//     } else {
//       const data = await addSubscriber({ user_id: user.id, subscribed_to_id: video.profiles.id });
//       setSubscriberCount(c => c + 1);
//       setSubscribed(true);
//     }
//   };

//   return {
//     video,
//     comments,
//     likes,
//     subscriberCount,
//     subscribed,
//     toggleLike,
//     toggleSubscribe,
//     setComments,
//     loading,
//     error,
//   };
// }
import { useState, useEffect } from 'react';
import { loadVideoById, incrementVideoViewCount } from '../modules/loadVideoById';
import { getLikesByVideo, addLikeOnVideo, modifyLikeOnVideo, removeLikeOnVideo } from '../modules/like';
import { getTotalSubscriberCountByProfile, addSubscriber, deleteSubscriber,currentUserSubscribedToProfile } from '../modules/subscriber';
import { CommentWithProfile, VideoWithProfile } from '../types/VideoLoadTypes';
import { toast } from 'react-hot-toast';
import { current } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

interface LikesState {
  totalLikes: number;
  totalDislikes: number;
  userVote: { id: string; liked: boolean } | null ;
}

export function useVideoById(videoId?: string, user?: { id: string }) {
  const [video, setVideo] = useState<VideoWithProfile | null>(null);
  const [comments, setComments] = useState<CommentWithProfile[] | [] | null >([]);
  const [likes, setLikes] = useState<LikesState>({ totalLikes: 0, totalDislikes: 0, userVote: null });
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
          setLoading(false);
          return;
        }

        // Fetch video details
        const { VideoWithProfile } = await loadVideoById(videoId);
        if (!VideoWithProfile) throw new Error("Video not found.");
        if (cancelled) return;
        setVideo(VideoWithProfile);

        // Set comments for the video
        setComments(video?.comment as CommentWithProfile[] || []);

        // Get like/dislike count and user’s vote
        const likeRows = await getLikesByVideo(videoId);
        if (cancelled) return;
        const totalLikes = likeRows.filter(v => v.liked === true).length;
        const totalDislikes = likeRows.filter(v => v.liked === false).length;
        let userVote: LikesState['userVote'] = likes?.userVote;
        if (user?.id) {
          const uv = likeRows.find(v => v.user_id === user.id);
          if (uv && typeof uv.liked === 'boolean') {
            userVote = { id: uv.id, liked: uv.liked};
          }
        }
        setLikes({ totalLikes, totalDislikes, userVote });

        // Fetch subscriber count for the profile
        if (VideoWithProfile?.profiles?.id) {
          const count = await getTotalSubscriberCountByProfile(VideoWithProfile.profiles.id);
          if (cancelled) return;
          setSubscriberCount(count);

          if (user?.id) {
            // Check subscription status of the user
            console.log("Checking subscription status for user:", user.id, "to profile:", VideoWithProfile.profiles.id);
            // Here you can implement a check for whether the user is subscribed to the profile
          }
        }

        // Increment the view count
        await incrementVideoViewCount(videoId, VideoWithProfile.viewCount || 0);
        if (cancelled) return;
        setVideo(prev => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : prev));

      } catch (err: any) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };

  }, [videoId, user?.id]);

  // Handle like/dislike toggle
  const toggleLike = async (isLike: boolean) => {
    if (!videoId || !user) {
      toast.error("You need to log in to like or dislike a video.");
      return;
    }
    
    if (likes!==null && likes.userVote) {
      if(likes && likes?.userVote?.liked==isLike){
        const e = await removeLikeOnVideo(likes.userVote.id);
        if(error){
          toast.error("Error removing like/dislike.");
          return;
        }
        toast.success(`${likes.userVote?'Like':'Dislike'} removed.`);
        // Successfully removed like/dislike
        setLikes(prev=>{
          if(!prev.userVote) return prev;
          let totalLikes=prev.totalLikes;
          let totalDislikes=prev.totalDislikes;
          if(prev.userVote.liked){
            totalLikes=Math.max(0,totalLikes-1);
          }
          else{
            totalDislikes=Math.max(0,totalDislikes-1);
          }
          return {...prev,totalLikes,totalDislikes,userVote:null};
        });
        return;
      }
      // Modify existing like/dislike
      await modifyLikeOnVideo(likes.userVote.id, isLike);
      setLikes(prev => {
        if (!prev.userVote) return prev;
        let totalLikes = prev.totalLikes;
        let totalDislikes = prev.totalDislikes;
        if (prev.userVote.liked !== isLike) {
          if (isLike) {
            totalLikes += 1;
            if (prev.userVote.liked === false) totalDislikes = Math.max(0, totalDislikes - 1);
          } else {
            totalDislikes += 1;
            if (prev.userVote.liked === true) totalLikes = Math.max(0, totalLikes - 1);
          }
        }
        return { ...prev, totalLikes, totalDislikes, userVote: { id: prev.userVote.id, liked: isLike } };
      });
    } else {
      // Add new like/dislike entry
      const newEntry = await addLikeOnVideo({ video_id: videoId, user_id: user.id, liked: isLike });
      setLikes(prev => ({
        totalLikes: prev.totalLikes + (isLike ? 1 : 0),
        totalDislikes: prev.totalDislikes + (!isLike ? 1 : 0),
        userVote: { id: newEntry.id, liked: isLike },
      }));
    }
  };

  // Handle subscription toggle
  const toggleSubscribe = async () => {
    if (!video?.profiles?.id || !user) return;
    try {
      if(user){
        const subscriptionId = await currentUserSubscribedToProfile(user.id, video.profiles.id);
      console.log("Current subscription ID:", subscriptionId?.subscribedId);  
      setSubscriberId(subscriptionId?.subscribedId);
      } if (subscribed) {
        
        // Unsubscribe user from the profile
        await deleteSubscriber(subscriberId as string);
        setSubscriberCount(c => Math.max(0, c - 1));
        setSubscribed(false);
        toast.success("You have unsubscribed from this profile.");
      } else {
        // Subscribe user to the profile
        await addSubscriber({ user_id: user.id, subscribed_to_id: video.profiles.id });
        setSubscriberCount(c => c + 1);
        setSubscribed(true);
        setSubscriberId(user?.id);
        toast.success("You are now subscribed to this profile.");
      }
    } catch (err) {
      toast.error("Error handling subscription.");
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
