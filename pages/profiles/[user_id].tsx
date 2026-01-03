import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Avatar from "../../src/components/Avatar";
import styles from "./[user_id].module.css";
import { Roboto } from "next/font/google";
import VideoIcon from "../../src/components/videos/VideoIcon";
import ProfileShimmer from "../../src/components/shimmers/ProfileShimmer";
import { useProfileWithVideos } from "../../src/hooks/useProfileById";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const Profile: React.FC = () => {
  const router = useRouter();

  /**
   * ✅ SAFELY DERIVE userId
   * - No local state
   * - No setState during render
   * - Stable across renders
   */
  const userId = useMemo(() => {
    if (!router.isReady) return undefined;
    return router.query.user_id as string | undefined;
  }, [router.isReady, router.query.user_id]);

  /**
   * ✅ HOOK IS ONLY CALLED WITH VALID ID
   */
  const { profile, videos, loading, error } =
    useProfileWithVideos(userId);
  console.log(profile);
  /**
   * ===================== RENDER STATES =====================
   */

  if (!router.isReady || loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center p-2">
        <ProfileShimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  /**
   * ===================== MAIN UI =====================
   */

  return (
    <div className="mx-5 z-50" id={styles.main}>
      <div className="min-h-screen">
        {/* PROFILE HEADER */}
        <div id={styles.col}>
          <div
            id={styles.row}
            className="bg-zinc-900 min-w-full px-6 py-4 flex gap-4 rounded-lg"
          >
            <Avatar
              uid={profile.id}
              url={profile.avatar_url ?? undefined}
              size={75}
              where="video"
              onUpload={() => {}}
            />

            <div id={styles.col} className={roboto.className}>
              <h1 className="text-white text-xl">
                {profile.full_name}
              </h1>

              <h2 className="text-gray-500">
                @{profile.username}
              </h2>

              <h3 className="text-gray-400">
                {profile.subscribers.length} Subscribers
              </h3>
            </div>
          </div>
        </div>

        {/* VIDEOS */}
        <div className="mt-4">
          <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-teal-300 mb-3 pb-1">
            Videos by @{profile.username}
          </h1>

          <div id={styles.grid} className="p-1">
            {videos.map((video) => (
              <VideoIcon
                key={video.id}
                video={video}
                where="profile"
                allowHover
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
