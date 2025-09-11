import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../src/components/Avatar";
import styles from "./[user_id].module.css";
import { Roboto } from "next/font/google";
import VideoIcon from "../../src/components/videos/VideoIcon";
import ProfileShimmer from "../../src/components/shimmers/ProfileShimmer";
import { useProfile } from "../../src/hooks/useProfile";
import { Video } from "../../src/types/VideoRedux";
import { VideoWithProfile } from "../../src/types/VideoLoadTypes";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

function Profile() {
  const router = useRouter();
  const [userId, setUserId] = React.useState<string>("");

  React.useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.user_id;
    if (typeof id === "string") setUserId(id);
  }, [router.isReady, router.query.user_id]);

  const { profileWithVideos, error, loading, subscriberCount } = useProfile(userId as string);

  // FIX: Only set safeVideos when profileWithVideos or loading changes
  const [safeVideos, setSafeVideos] = React.useState<Video[]>([]);
  React.useEffect(() => {
    if (!loading && profileWithVideos) {
      const safeVideo: VideoWithProfile[] = (profileWithVideos.video ?? []).map((v: any) => ({
        id: v.id,
        created_at: v.created_at ?? null,
        description: v.description ?? null,
        dislikes: v.dislikes ?? null,
        likes: v.likes ?? null,
        thumbnailUrl: v.thumbnailUrl ?? null,
        title: v.title ?? null,
        user_id: v.user_id ?? null,
        videoStatus: v.videoStatus ?? null,
        videoUrl: v.videoUrl ?? null,
        viewCount: v.viewCount ?? null,
        profiles: v.profiles ?? null, // or null if not present
      }));
      
      setSafeVideos(safeVideo);
    } else if (!loading) {
      setSafeVideos([]);
    }
  }, [profileWithVideos, loading]);
  const returnVideos = () => {
    if (loading) {
      return (
        <div className="flex w-full min-h-screen items-center justify-center p-2 text-xxl">
          <ProfileShimmer />
        </div>
      );
    } else if (!loading && error) {
      return (
        <div className="flex w-full min-h-screen items-center justify-center p-2 text-xxl text-red-500">
          <h1>Error Loading Profile</h1>
        </div>
      );
    } else if (!loading && profileWithVideos !== null) {
      return (
        <div className="min-h-screen">
          <div id={styles.col} className="mb-3">
            <div id={styles.row} className="bg-zinc-900 min-w-full px-6 py-2">
              <Avatar
                uid={profileWithVideos?.id}
                url={profileWithVideos?.avatar_url}
                size={75}
                where="video"
                onUpload={(e: any) => {
                  return;
                }}
              />
              <div id={styles.col} className={roboto.className}>
                <h1 className="text-white">{profileWithVideos?.full_name}</h1>
                <h1 className="text-gray-500">{`@${profileWithVideos?.username}`}</h1>
                <h1 className="text-gray-400">{`${subscriberCount} Subscribers`}</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-teal-300 mb-1 pb-1">
              Videos by {`@${profileWithVideos?.full_name}`}
            </h1>
            <div id={styles.grid} className="p-1">
            {safeVideos.map((pie: VideoWithProfile) => (
          <VideoIcon
            video={pie}
            where="profile"
            allowHover={true}
            key={pie.id}
          />
          ))}

            </div>
          </div>
        </div>
      );
    }
    // Optionally, handle the case where nothing matches
    return null;
  };

  return (
    <div className="mx-5 z-50" id={styles.main}>
      {returnVideos()}
    </div>
  );
}

export default Profile;
