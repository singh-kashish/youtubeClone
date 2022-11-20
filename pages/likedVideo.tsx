import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_LIKED_VIDEOS_BY_USER_ID } from "../graphql/queries";
import styles from "./styles/likedVideo.module.css";
import VideoIcon from "../components/VideoIcon";
import { LineWobble } from "@uiball/loaders";

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
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-300 mb-1 pb-1">
          Login First!
        </h6>
      );
    }
  };
  const returnVideos = () =>{
    if(!data){
      return (
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
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
    <div>
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Liked Videos
      </h6>
      {returnVideos()}
    </div>
  );
}

export default library;
