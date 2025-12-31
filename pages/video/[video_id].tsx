import React, { useEffect, useCallback, useState } from "react";
import styles from "./[video_id].module.css";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import Avatar from "../../src/components/Avatar";
import SuggestedVideo from "../../src/components/SuggestedVideos";
import CurrentQueue from "../../src/components/CurrentQueue";
import VideoShimmer from "../../src/components/shimmers/VideoShimmer";
import VideoPlayerWithPersistence from "../../src/components/videos/VideoPlayerWithPersistance";
import CommentSection from "../../src/components/videos/comments/CommentSection";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MusicNote from "@mui/icons-material/MusicNote";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { useVideo } from "../../src/hooks/video/useVideo";
import { useComments } from "../../src/hooks/comment/useComments";
import { useLikes } from "../../src/hooks/likes/useLikes";

const robotoBold = Roboto({ weight: "700", subsets: ["latin"] });
const roboto = Roboto({ weight: "500", subsets: ["latin"] });

const Video: React.FC = () => {
  const router = useRouter();
  const { video_id } = router.query;
  const user = useUser();

  /* ----------------------------- DATA HOOKS ----------------------------- */

  const { video, loading } = useVideo(video_id as string);
  console.log('videoData>',video,loading);
  const {
    comments,
    createComment,
  } = useComments(video_id as string);
  console.log('Comment',comments,createComment);
  const {
    likes,
    toggleLike,
  } = useLikes(video_id as string, user?.id);
  console.log('likes>',likes,toggleLike);
  /* ----------------------------- HANDLERS ----------------------------- */

  const handleLike = async (liked: boolean) => {
    if (!user) {
      toast.error("Please log in to like or dislike");
      return;
    }

    await toast.promise(toggleLike(liked), {
      loading: liked ? "Liking..." : "Disliking...",
      success: liked ? "Liked" : "Disliked",
      error: "Failed to update",
    });
  };

  const handleAddComment = async (text: string) => {
    if (!user || !video) {
      toast.error("Please log in to comment");
      return;
    }

    await createComment({
      video_id: video.id,
      user_id: user.id,
      content: text,
    });

    toast.success("Comment added");
  };

  /* ----------------------------- STATES ----------------------------- */

  if (loading) return <VideoShimmer />;

  if ((!video || video.videoStatus !== true) && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Video Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const accountUrl = `/profiles/${video?.user_id}`;

  /* ----------------------------- RENDER ----------------------------- */

  return (
    <div className="min-h-screen md:pl-3 pt-5" id={styles.main}>
      <div className="w-full">
        {/* VIDEO PLAYER */}
        <div id={styles.video}>
          <VideoPlayerWithPersistence
            videoUrl={video.videoUrl}
            videoId={video.id}
          />
        </div>

        {/* TITLE */}
        <h1 id={styles.title} className={robotoBold.className}>
          {video.title}
        </h1>

        {/* CHANNEL + ACTIONS */}
        <div id={styles.belowVideo}>
          <div id={styles.row_icons}>
            <div id={styles.left}>
              <Link href={accountUrl}>
                <Avatar
                  uid={video?.user_id}
                  url={video?.profiles?.avatar_url}
                  size={55}
                  where="video"
                  onUpload={() => {}}
                />
              </Link>

              <div>
                <Link href={accountUrl}>
                  <h1 className={robotoBold.className}>
                    {video?.profiles?.username}
                    <MusicNote fontSize="small" />
                  </h1>
                </Link>
                <p className="text-gray-400 text-sm">
                  Channel
                </p>
              </div>

              <button
                className={styles.subscribe}
              >
                Subscribe
              </button>

              <NotificationsOutlinedIcon
                fontSize="medium"
                sx={{ color: "lightgrey" }}
                className="hidden md:inline-block ml-2"
              />

              {/* LIKE / DISLIKE */}
              <div className="md:ml-2">
                <button
                  id={styles.likeUnlikeButton}
                  className="rounded-full shadow-md flex items-center"
                >
                  <div
                    className={
                      likes.userVote?.liked === true
                        ? styles.likeD
                        : styles.like
                    }
                    onClick={() => handleLike(true)}
                  >
                    <ThumbUpIcon />
                    {likes.totalLikes}
                  </div>

                  <span className="px-2">|</span>

                  <div
                    className={
                      likes?.userVote?.liked === false
                        ? styles.likeD
                        : styles.like
                    }
                    onClick={() => handleLike(false)}
                  >
                    <ThumbDownOffAltIcon />
                    {likes?.totalDislikes}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div id={styles.description}>
          <h1 className={roboto.className}>
            {video?.viewCount} views
          </h1>
          <p>{video?.description}</p>
        </div>

        {/* COMMENTS */}
        <CommentSection
          user={user}
          video={video}
          comments={comments}
          addCommentOptimistically={(comment) =>
            handleAddComment(comment?.text as string
            )
          }
        />
      </div>

      {/* RIGHT SIDEBAR */}
      <div>
        <CurrentQueue />
        <SuggestedVideo where="Video" />
      </div>
    </div>
  );
};

export default Video;
