import React, { useEffect, useState, useCallback } from "react";
import styles from "./[video_id].module.css";
import { Roboto } from "next/font/google";
import Avatar from "../../src/components/Avatar";
import MusicNote from "@mui/icons-material/MusicNote";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Link from "next/link";
import SuggestedVideo from "../../src/components/SuggestedVideos";
import toast from "react-hot-toast";
import CurrentQueue from "../../src/components/CurrentQueue";
import VideoShimmer from "../../src/components/shimmers/VideoShimmer";
import { useVideoById } from "../../src/hooks/useVideoByIdHook";
import { usePathname } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import VideoPlayerWithPersistence from "../../src/components/videos/VideoPlayerWithPersistance";
import CommentSection from "../../src/components/videos/comments/CommentSection";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#3d3d3d",
  boxShadow: "24",
  padding: 2,
};

const Video: React.FC = () => {
  const suggestProps = { where: "Video" };
  const router = useRouter();
  const { video_id } = router.query;
  const user = useUser();
  const pathname = usePathname();

  const {
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
  } = useVideoById(video_id as string, user ? { id: user.id } : undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (video_id) {
      console.log("Fetching video data for:", video_id);
    }
  }, [video_id]);

  const handleAddComment = useCallback((newComment: any) => {
    setComments((prev) => [...prev, newComment]);
    toast.success("Comment added!");
  }, []);

  if (loading) return <VideoShimmer />;

  if (error || !video || video.videoStatus !== true) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Video Not Found</h1>
        <h6 className="text-red-600 mt-2">
          ERROR: {error?.message || "Unknown error"}
        </h6>
        <button
          onClick={() => router.push("/")}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  const accountUrl = `/profiles/${video?.user_id}`;

  const handleLike = (liked: boolean) => {
    if (!user) {
      toast.error("Please log in to like or dislike.");
      return;
    }

    toast.promise(toggleLike(liked), {
      loading: liked ? "Liking..." : "Disliking...",
      success: liked ? "Liked!" : "Disliked!",
      error: "Failed to update like.",
    });
  };

  const handleSubscribe = () => {
    if (!user) {
      toast.error("Please log in to subscribe.");
      return;
    }

    toast.promise(toggleSubscribe(), {
      loading: subscribed ? "Unsubscribing..." : "Subscribing...",
      success: subscribed ? "Unsubscribed!" : "Subscribed!",
      error: "Subscription failed.",
    });
  };

  return (
    <div className="min-h-screen md:pl-3 pt-5 lg:dvw" id={styles.main}>
      <div className="w-[100vw]">
        <div id={styles.video}>
          <VideoPlayerWithPersistence
            videoUrl={video.videoUrl || ""}
            videoId={video.id || ""}
          />
        </div>
        <div className="mb-1">
          <h1 id={styles.title} className={roboto.className}>
            {video.title}
          </h1>
        </div>

        <div id={styles.belowVideo}>
          <div id={styles.row_icons}>
            <div id={styles.left}>
              <Link href={accountUrl}>
                <Avatar
                  uid={video.user_id || ""}
                  url={video.profiles?.avatar_url || "/default-avatar.png"}
                  size={55}
                  where="video"
                  onUpload={() => {}}
                />
              </Link>
              <div>
                <Link href={accountUrl}>
                  <h1 className={roboto.className} style={{ color: "white" }}>
                    {video.profiles?.username || "Unknown Creator"}
                    <MusicNote fontSize="small" />
                  </h1>
                </Link>
                <div className="text-gray-300 font-extralight">
                  {subscriberCount} subscribers
                </div>
              </div>
              <div>
                <button
                  id={subscribed ? styles.subscribed : styles.subscribe}
                  className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubscribe();
                  }}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
                <NotificationsOutlinedIcon
                  fontSize="medium"
                  sx={{ color: "lightgrey" }}
                  className="hidden ml-2 md:inline-block"
                />
              </div>
              <div className="md:ml-2">
                <button
                  id={styles.likeUnlikeButton}
                  className="md:mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  <div
                    id={
                      likes.userVote?.liked === true
                        ? styles.likeD
                        : styles.like
                    }
                    className="md:px-2 md:py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(true);
                    }}
                  >
                    <ThumbUpIcon className="pr-2" />
                    {likes.totalLikes}
                  </div>
                  <p className="text-gray-800" id={styles.diwaar}>
                    |
                  </p>
                  <div
                    id={
                      likes.userVote?.liked === false
                        ? styles.likeD
                        : styles.like
                    }
                    className="px-2 py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(false);
                    }}
                  >
                    <ThumbDownOffAltIcon className="pr-2" />
                    {likes.totalDislikes}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="" id={styles.description}>
          <div className={roboto.className}>
            <h1 className="text-lg">{video.viewCount} views</h1>
          </div>
          <div>{video.description}</div>
        </div>

        <CommentSection
          user={user}
          comments={comments}
          video={video}
          addCommentOptimistically={handleAddComment}
        />
      </div>

      <div className="">
        <CurrentQueue />
        <SuggestedVideo {...suggestProps} />
      </div>
    </div>
  );
};

export default Video;
