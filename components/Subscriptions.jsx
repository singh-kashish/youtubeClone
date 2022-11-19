import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import { GET_SUBSCRIBERS_USING_USER_ID } from "../graphql/queries";
import Avatar from "./Avatar";
import styles from "./styles/Subscriptions.module.css";

function Subscriptions() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_SUBSCRIBERS_USING_USER_ID, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.getSubscribersUsingSubscribers_user_id_fkey?.length == 0) {
      return;
    } else {
      return (
        <div>
          {data?.getSubscribersUsingSubscribers_user_id_fkey.map((pie) => (
            <Link href={`/profiles/${pie.subscribed_to_id}`}>
              <div id={styles.row}>
                <Avatar
                  uid={pie.profilesUsingSubscribers_subscribed_to_id_fkey.id}
                  url={
                    pie.profilesUsingSubscribers_subscribed_to_id_fkey
                      .avatar_url
                  }
                  size={25}
                  where="video"
                />
                <h1 className="text-sm font-sans font-medium">
                  {pie.profilesUsingSubscribers_subscribed_to_id_fkey.username}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };
  return (
    <div id={styles.main}>
      <h6 className="font-sans font-medium text-lg border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Subscriptions
      </h6>
      {videosFound()}
    </div>
  );
}

export default Subscriptions;
