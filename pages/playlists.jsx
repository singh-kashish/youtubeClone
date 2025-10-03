import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/playlists.module.css";
import AllPlaylists from "../src/components/AllPlaylists";
import CurrentQueue from "../src/components/CurrentQueue";
function Playlists() {
  const p = useSelector((state) => state.playlist.value);
  //const allPlaylistDataObject = useAllPlaylist();
  return (
    <div
      className="bg-[#181818] min-h-screen md:pl-3 lg:dvw"
      id={styles.mainLine}
    >
      <div className="bg-[#181818] flex flex-col align-start justify-start w-full">
        <h1 id={styles.pageName}>Playlists</h1>
        {p?.length > 0 ? (
          <CurrentQueue />
        ) : (
          <h1 className="text-lg text-red-500 flex flex-wrap max-w-fit text-wrap">
            <p className="font-semibold mr-2 text-red-600">Error -</p>We
            couldn't find any videos in the Current Queue, add videos to current
            queue to manage queue here or create a playlist from it.
          </h1>
        )}
        <AllPlaylists playlists={allPlaylistDataObject} />
      </div>
    </div>
  );
}

export default Playlists;
