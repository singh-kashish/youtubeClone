import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist,deleteFromPlaylist } from "../reduxReducers/playlistSlice";
import VideoIcon from "../src/components/VideoIcon";
import styles from "./styles/playlists.module.css";

let playListData = (playlist) => {
  if (playlist?.length > 0) {
    return (
      <div id={styles.main}>
        <h1 id={styles.currentQueue}>Current Queue</h1>
        {playlist.map((vid) => {
          return (
            <div id={styles.icon} key={vid.id}>
              <VideoIcon
                key={vid.id}
                video={vid}
                where="playlist"
                className="mt-1 max-w-fit"
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div className="font-serif text-gray-300">Current Queue is Empty</div>;
  }
};
function playlists() {
  const playlist = useSelector((state) => state.playlist.value);
  return (
    <div className="bg-[#181818]" id={styles.mainLine}>
      <h1 id={styles.pageName}>Playlists</h1>
      {playListData(playlist)}
    </div>
  );
}

export default playlists;
