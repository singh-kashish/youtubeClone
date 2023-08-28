import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  deleteFromPlaylist,
} from "../reduxReducers/playlistSlice";
import VideoIcon from "../components/VideoIcon";
import styles from "./styles/CurrentQueue.module.css";
import { Roboto } from "@next/font/google";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
import { useRouter } from "next/router";

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
          Queue
        </h1>
        <p style={{ fontSize: "14px", color: "#717171", fontWeight: "600" }}>
          {videoPosition}/{playlist.length}
        </p>
        {playlist.map((vid) => {
          return (
            <div id={styles.icon}>
              <VideoIcon
                key={vid.id}
                video={vid}
                where="playlist"
                className="mt-1 max-w-fit"
                allowHover={false}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div className="hidden">Current Queue is Empty</div>;
  }
};
function currentQueue() {
  const playlist = useSelector((state) => state.playlist.value);
  console.log(playlist);
  return (
    <div className="bg-[#100f0f]" id={styles.mainLine}>
      {playListData(playlist)}
    </div>
  );
}

export default currentQueue;
