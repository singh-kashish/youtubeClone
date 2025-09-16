import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from "./styles/library.module.css";
import VideoIcon from "../src/components/videos/VideoIcon";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Shimmer from "../src/components/Shimmer";
import {useProfile} from "../src/hooks/useProfile";

function Library() {
  const user = useUser();
  const { profileWithVideos, loading, error, subscriberCount } = useProfile(user?.id);
  console.log(loading,profileWithVideos,error,subscriberCount);
  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Link href="/login">
          <h6 className="font-sans font-bold text-xl w-full text-center text-blue-800 mb-1 pb-1">
            Login First!
          </h6>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-dvw min-h-screen bg-zinc-900">
        <Shimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1">
          Error: {error.message}
        </h6>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Library
      </h6>
      <div id={styles.main}>
        {profileWithVideos?.video && profileWithVideos.video?.length > 0 ? (
          profileWithVideos?.video?.map((pie) => (
            <div id={styles.col} key={pie?.id}>
              <div id={styles.row}>
                <Link href={`/video/edit/${pie.id}`}>
                  <button className="mb-2 mr-2 py-2 px-4 shadow-md no-underline rounded-full bg-emerald-600 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none">
                    Edit
                    <EditIcon sx={{ fontSize: 15 }} className="ml-2" />
                  </button>
                </Link>
                <Link href={`/video/delete/${pie.id}`}>
                  <button className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red-700 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none">
                    Delete
                    <DeleteIcon sx={{ fontSize: 15 }} className="ml-2" />
                  </button>
                </Link>
              </div>
              <VideoIcon video={pie} where="library" />
            </div>
          ))
        ) : (
          <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1">
            You haven't uploaded any video yet
          </h6>
        )}
      </div>
    </div>
  );
}

export default Library;
