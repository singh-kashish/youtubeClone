import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_LIKED_VIDEOS_BY_USER_ID } from "../graphql/queries";
import styles from "./styles/likedVideo.module.css";
import VideoIcon from "../src/components/VideoIcon";
import Link from "next/link";
import Shimmer from "../src/components/Shimmer";

function LikedVideo() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_LIKED_VIDEOS_BY_USER_ID, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.likedVideosUsingLikedVideos_user_id_fkey?.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1 ml-[50%]">
          You haven't liked any video yet.
        </h6>
      );
    } else if (!user) {
      return (
        <Link href="/login">
          <h6 className="font-sans font-bold text-xl w-full text-center text-blue-700 mb-1 pb-1">
            Login First!
          </h6>
        </Link>
      );
    }
  };
  const returnVideos = () => {
    if (!user) {
      return (
        <Link href="/login">
          <h6 className="font-sans font-bold text-xl w-full text-center text-blue-700 mb-1 pb-1">
            Login First!
          </h6>
        </Link>
      );
    } else if (!data) {
      return (
        <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-fit min-h-screen  bg-zinc-900">
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {data?.likedVideosUsingLikedVideos_user_id_fkey?.map((pie: any) => {
            return pie.liked === true ? (
              <div key={pie?.id}>
                <VideoIcon video={pie.video} where="home" allowHover={true} />
              </div>
            ) : (
              <h1>Private</h1>
            );
          })}
          {videosFound()}
        </div>
      );
    }
  };
  return (
    <div className="min-h-screen">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Liked Videos
      </h6>
      {returnVideos()}
    </div>
  );
}

export default LikedVideo;
