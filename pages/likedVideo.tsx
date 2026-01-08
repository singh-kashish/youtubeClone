import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "./styles/likedVideo.module.css";
import VideoIcon from "../src/components/videos/VideoIcon";
import Link from "next/link";
import Shimmer from "../src/components/Shimmer";
import { useLikedVideosByUserId } from "../src/hooks/useLikedVideosByUserId";

function LikedVideo() {
  const user = useUser();
  const { videos, loading } = useLikedVideosByUserId(user?.id);

  const renderContent = () => {
    if (!user) {
      return (
        <Link href="/login">
          <h6 className="font-sans font-bold text-xl text-center text-blue-700">
            Login First!
          </h6>
        </Link>
      );
    }

    if (loading) {
      return (
        <div className="ml-[10px] mt-2 grid grid-cols-3 gap-2 min-h-screen bg-zinc-900">
          <Shimmer />
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <h6 className="font-sans font-bold text-xl text-center text-red-400">
          You haven't liked any video yet.
        </h6>
      );
    }

    return (
      <div id={styles.main}>
        {videos.map((video) => (
          <div key={video.id}>
            <VideoIcon
              video={video}
              where="home"
              allowHover
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 text-center text-gray-300 mb-1 pb-1">
        Your Liked Videos
      </h6>
      {renderContent()}
    </div>
  );
}

export default LikedVideo;
