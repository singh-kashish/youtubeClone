import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_LIKED_VIDEOS_BY_USER_ID } from "../graphql/queries";
import styles from "./styles/likedVideo.module.css";
import VideoIcon from "../components/VideoIcon";
import { LineWobble } from "@uiball/loaders";
import Link from "next/link";

function library() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_LIKED_VIDEOS_BY_USER_ID, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.getLikedVideosUsingLikedVideos_user_id_fkey?.length == 0) {
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
  const returnVideos = () =>{
    if (!user) {
      return (
        <Link href="/login">
        <h6 className="font-sans font-bold text-xl w-full text-center text-blue-700 mb-1 pb-1">
          Login First!
        </h6>
        </Link>
      );
    }else if(!data){
      return (
        <div className="flex w-full min-h-screen items-center justify-center p-10 text-xxl m-5">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {data?.getLikedVideosUsingLikedVideos_user_id_fkey?.map(
            (pie: any) => {
              return pie.liked === true ? (
                <div key={pie.id}>
                  <VideoIcon video={pie.video} where="home" />
                </div>
              ) : (
                <h1>Private</h1>
              );
            }
          )}
          {videosFound()}
        </div>
      );
    }
  }
  return (
    <div className="min-h-screen">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Liked Videos
      </h6>
      {returnVideos()}
    </div>
  );
}

export default library;
