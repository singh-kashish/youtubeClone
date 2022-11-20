import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import { GET_PROFILE } from "../../graphql/queries";
import styles from "./[user_id].module.css";
import { Roboto } from "@next/font/google";
import VideoIcon from "../../components/VideoIcon";
import { LineWobble } from "@uiball/loaders";

const roboto = Roboto({
  weight: "700",
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
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
      return (
        <div>
          <div id={styles.col}>
            <div
              id={styles.row}
              className="bg-[#272626] md:w-[500px] lg:w-[700px] xl:w-[950px] px-6 py-2"
            >
              <Avatar
                uid={profile?.id}
                url={profile?.avatar_url}
                size={75}
                where="video"
                onUpload={(e: any) => {
                  console.log("ek aur dukh");
                  return;
                }}
              />
              <div id={styles.col} className={roboto.className}>
                <h1>{profile?.full_name}</h1>
                <h1>{`@${profile?.username}`}</h1>
                <h1>{`${profile?.subscribersUsingSubscribers_subscribed_to_id_fkey?.length} Subscribers`}</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-white mb-1 pb-1">
              Videos
            </h1>
            <div id={styles.grid}>
              {profile?.video?.map((pie: any) => (
                <VideoIcon video={pie} where="profile" />
              ))}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="mx-5 z-50" id={styles.main}>
      <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-white mb-1 pb-1">
        Profile
      </h1>
      {returnVideos()}
    </div>
  );
}

export default Profile;
