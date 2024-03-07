import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  deleteFromPlaylist, clearPlaylist
} from "../../reduxReducers/playlistSlice";
import VideoIcon from "../components/VideoIcon";
import styles from "./styles/CurrentQueue.module.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
import { useRouter } from "next/router";

let PlayListData = (playlist) => {
  const dispatch = useDispatch();
  if (playlist?.length > 0) {
    const Router = useRouter();
    const findIdx = (element) => {
      return element.id === Router.query.video_id;
    };
    const videoPosition = playlist.findIndex(findIdx) + 1;
    return (
      <div id={styles.main}>
        <div className="flex flex-row justify-between w-full">
          <div>
            <h1 className={roboto.className} id={styles.headin}>
              Queue
            </h1>
            <p
              style={{ fontSize: "14px", color: "#717171", fontWeight: "600" }}
            >
              {videoPosition}/{playlist.length}
            </p>
          </div>
          <button className="bg-blue-300 rounded-3xl px-2 py-1 hover:bg-teal-900 shadow-lg" onClick={
            (e)=>{
              e.preventDefault();
              dispatch(clearPlaylist());
            }}
          >
            Clear Queue
          </button>
        </div>
        {playlist.map((vid) => {
          return (
            <div id={styles.icon} key={vid?.id}>
              <VideoIcon
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
function CurrentQueue() {
  const playlist = useSelector((state) => state.playlist.value);
  return (
    <div className="bg-[#100f0f]" id={styles.mainLine}>
      {PlayListData(playlist)}
    </div>
  );
}

export default CurrentQueue;
