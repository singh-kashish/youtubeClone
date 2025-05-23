import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Avatar from "./Avatar";
import styles from "./styles/ProfileSearch.module.css";
import { Roboto } from "next/font/google";
import Link from "next/link";
import useProfileSearchHook from "../hooks/useProfileSearchHook";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });
const rb = Roboto({ weight: "300", subsets: ["latin"] });
const rt = Roboto({ weight: "100", subsets: ["latin"] });
function ProfileSearch({ text }) {
  const user = useUser();
  const profiles = useProfileSearchHook(text);
  const videosFound = () => {
    if (profiles === undefined) {
      return (
        <div className="flex items-center justify-center" id={styles.wobble}>
          <h5
            id="shimmerItem"
            className="py-20 w-3/4 text-lg font-normal text-gray-200 text-center"
          >
            Searching...
          </h5>
        </div>
      );
    } else if (profiles?.length === 0) {
      return (
        <div
          className="flex items-center justify-center p-10 text-xxl m-1/2"
          id={styles.main}
        >
          <h2>No Profiles found.</h2>
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {profiles?.map((pie) => (
            <Link href={`/profiles/${pie?.id}`} key={pie?.id}>
              <div id={styles.user}>
                <Avatar
                  uid={pie?.id}
                  url={pie?.avatar_url}
                  size={150}
                  where="video"
                  onUpload={(e) => {
                    return;
                  }}
                />
                <div id={styles.col} className={roboto.className}>
                  <h1 className={r.className}>{pie?.full_name}</h1>
                  <h1 className={rt.className} id={styles.text}>
                    {`@${pie?.username}`} <span>•</span>
                    <span className="ml-1">
                      {
                        pie?.subscribersUsingSubscribers_subscribed_to_id_fkey
                          ?.length
                      }
                      Subscribers
                    </span>
                  </h1>
                  {/* <h1>{`${profile?.subscribersUsingSubscribers_subscribed_to_id_fkey?.length} Subscribers`}</h1> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };
  const returnProfiles = () => {
    return videosFound();
  };
  return (
    <div>
      <h6 className="font-sans font-bold text-xl  w-full text-center text-gray-300 mb-[0.5] pb-1">
        Profiles
      </h6>
      {returnProfiles()}
    </div>
  );
}

export default ProfileSearch;
