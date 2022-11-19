import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_PROFILE } from "../graphql/queries";
import styles from "./styles/library.module.css";
import VideoIcon from "../components/VideoIcon";

function library() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.getProfiles?.video.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1 ml-[50%]">
          You haven't uploaded any video yet
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
  return (
    <div>
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Library
      </h6>
      <div id={styles.main}>
        {data?.getProfiles?.video?.map((pie) => (
          <VideoIcon video={pie} where="library" />
        ))}
        {videosFound()}
      </div>
    </div>
  );
}

export default library;
