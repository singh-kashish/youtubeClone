import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_SUBSCRIBERS_USING_USER_ID } from "../graphql/queries";
import styles from "./styles/subscriptions.module.css";
import VideoIcon from "../components/VideoIcon";

function subscriptions() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_SUBSCRIBERS_USING_USER_ID, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.getSubscribersUsingSubscribers_user_id_fkey?.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1 ml-[50%]">
          You haven't subscribed to any creator yet
        </h6>
      );
    } else if(!user){
        return(<h6 className="font-sans font-bold text-xl w-full text-center text-red-300 mb-1 pb-1">
        Login First!
      </h6>);
    } else{
      return (
        <div id={styles.main}>
          {data?.getSubscribersUsingSubscribers_user_id_fkey.map((pie) =>
            pie.profilesUsingSubscribers_subscribed_to_id_fkey?.video.map(
              (e) => <VideoIcon video={e} where="subs" />
            )
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Videos from your Subscriptions
      </h6>
      {videosFound()}
    </div>
  );
}

export default subscriptions;
