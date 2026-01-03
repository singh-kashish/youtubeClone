import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import styles from "./styles/Subscriptions.module.css";

function Subscriptions() {
  const user = useUser();

  const videosFound = () => {
    if (!user) {
      return <h1 className="mt-2 border-t border-slate-700">Login to see your subscriptions</h1>;
    } else if (data?.subscribersUsingSubscribers_user_id_fkey?.length == 0) {
      return <h1 className="mt-2 border-t border-slate-700">No subscriptions found</h1>;
    } else {
      return (
        <div className="mt-2 border-t border-slate-700">
          {data?.subscribersUsingSubscribers_user_id_fkey.map((pie) => (
            <Link href={`/${pie.subscribed_to_id}`} key={pie.id}>
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
    <div id={styles.main} className="mt-2 border-t border-slate-700">
      <h6 className="font-sans font-medium text-lg border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Subscriptions
      </h6>
      {/* {videosFound()} */}
    </div>
  );
}

export default Subscriptions;
