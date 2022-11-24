import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_SUBSCRIBERS_USING_USER_ID } from "../graphql/queries";
import styles from "./styles/subscriptions.module.css";
import VideoIcon from "../components/VideoIcon";
import { LineWobble } from "@uiball/loaders";

function subscriptions() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_SUBSCRIBERS_USING_USER_ID, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (!user) {
      return (
        <h6 className="font-sans font-bold text-xl text-center text-red-300 mb-1 pb-1 ml-[10%] mt-4">
          Login First!
        </h6>
      );
    } else if (data?.getSubscribersUsingSubscribers_user_id_fkey?.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl text-center text-red-400 mb-1 pb-1 ml-[15%]">
          You haven't subscribed to any creator yet
        </h6>
      );
    } else if (!data) {
      return (
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
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
  const returnVideos = () => {
    return videosFound();
  };
  return (
    <div>
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Videos from your Subscriptions
      </h6>
      {returnVideos()}
    </div>
  );
}

export default subscriptions;
