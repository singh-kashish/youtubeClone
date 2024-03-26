import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../src/components/Avatar";
import { GET_PROFILE } from "../../graphql/queries";
import styles from "./[user_id].module.css";
import { Roboto } from "next/font/google";
import VideoIcon from "../../src/components/VideoIcon";
import { LineWobble } from "@uiball/loaders";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});
function Profile() {
  const Router = useRouter();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: Router.query.user_id,
    },
  });
  const profile: any = data?.getProfiles;
  const returnVideos = () => {
    if (!profile) {
      return (
        <div className="flex w-full min-h-screen items-center justify-center p-10 text-xxl m-5">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen">
          <div id={styles.col}>
            <div
              id={styles.row}
              className="bg-zinc-900 min-w-full px-6 py-2"
            >
              <Avatar
                uid={profile?.id}
                url={profile?.avatar_url}
                size={75}
                where="video"
                onUpload={(e: any) => {
                  return;
                }}
              />
              <div id={styles.col} className={roboto.className}>
                <h1 className="text-white">{profile?.full_name}</h1>
                <h1 className="text-gray-500">{`@${profile?.username}`}</h1>
                <h1 className="text-gray-400">{`${profile?.subscribersUsingSubscribers_subscribed_to_id_fkey?.length} Subscribers`}</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-teal-300 mb-1 pb-1">
              Videos by {`@${profile?.full_name}`}
            </h1>
            <div id={styles.grid} className="p-1">
              {profile?.video?.map((pie: any) => (
                <VideoIcon video={pie} where="profile" allowHover={true} key={pie?.id} /> 
              ))}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="mx-5 z-50" id={styles.main}>
      {returnVideos()}
    </div>
  );
}

export default Profile;
