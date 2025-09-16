import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "./styles/likedVideo.module.css";
import VideoIcon from "../src/components/videos/VideoIcon";
import Link from "next/link";
import Shimmer from "../src/components/Shimmer";
import { useLikedVideos } from "../src/hooks/useLikedVideos";

function LikedVideo() {
  const user = useUser();
  const { likedVideos, loading, error, refetch } = useLikedVideos(user?.id);

  // Handle not logged in
  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Link href="/login">
          <h6 className="font-sans font-bold text-xl w-full text-center text-blue-700 mb-1 pb-1">
            Login First!
          </h6>
        </Link>
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-fit min-h-screen bg-zinc-900">
        <Shimmer />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1">
          Error: {error.message}
        </h6>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  // Handle empty state
  if (!likedVideos || likedVideos.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1">
          You haven't liked any video yet.
        </h6>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Liked Videos
      </h6>
      <div id={styles.main}>
        {likedVideos.map((pie) =>
          pie.liked ? (
            <div key={pie.id}>
              <VideoIcon video={pie.video} where="home" allowHover={true} />
            </div>
          ) : (
            <h1 key={pie.id}>Private</h1>
          )
        )}
      </div>
    </div>
  );
}

export default LikedVideo;
