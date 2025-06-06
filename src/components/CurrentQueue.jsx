import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  deleteFromPlaylist,
  clearPlaylist,
} from "../../reduxReducers/playlistSlice";
import VideoIcon from "../components/VideoIcon";
import styles from "./styles/CurrentQueue.module.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
import { useRouter } from "next/router";
import PlaylistModal from './PlaylistModal';
import Queue from "./Queue";

function CurrentQueue() {
  const dispatch = useDispatch();
  let playListData = (playlist) => {
    if (playlist?.length > 0) {
      const Router = useRouter();
      const findIdx = (element) => {
        return element.id === Router.query.video_id;
      };
      const videoPosition = playlist.findIndex(findIdx) + 1;
      return (
        <div id={styles.main}>
          <h1 className={roboto.className} id={styles.headin}>
            Current Queue
          </h1>
          <div id={styles.queueLine}>
            <div
              style={{ fontSize: "14px", color: "#717171", fontWeight: "600" }}
            >
              {videoPosition}/{playlist?.length}
            </div>
            <PlaylistModal why="Add Playlist"/>
            <div
              className="bg-[#2949c6] px-4 py-2 hover:shadow-md shadow-inner"
              id={styles.clearButton}
              onClick={(e) => {
                e.preventDefault();
                dispatch(clearPlaylist());
              }}
            >
              Clear Queue
            </div>
          </div>
          {<Queue playlist={playlist}/>}
        </div>
      );
    } else {
      return <div className="hidden">Current Queue is Empty</div>;
    }
  };
  const playlist = useSelector((state) => state.playlist.value);
  return <div id={styles.mainLine}>{playListData(playlist)}</div>;
}

export default CurrentQueue;
