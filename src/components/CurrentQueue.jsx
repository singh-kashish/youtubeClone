import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
<<<<<<< HEAD:src/components/CurrentQueue.jsx
  deleteFromPlaylist, clearPlaylist
} from "../../reduxReducers/playlistSlice";
=======
  deleteFromPlaylist,clearPlaylist
} from "../reduxReducers/playlistSlice";
>>>>>>> eb42cc4a041953e03bb2dac83cfbbef5be7febfb:components/CurrentQueue.jsx
import VideoIcon from "../components/VideoIcon";
import styles from "./styles/CurrentQueue.module.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
import { useRouter } from "next/router";

<<<<<<< HEAD:src/components/CurrentQueue.jsx
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
=======
function currentQueue() {
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
            Queue
          </h1>
          <div id={styles.queueLine}>
          <div style={{ fontSize: "14px", color: "#717171", fontWeight: "600" }}>
            {videoPosition}/{playlist.length}
          </div>
          <div className="bg-[#2949c6] px-4 py-2 hover:shadow-md shadow-inner" id={styles.clearButton} onClick={(e)=>{e.preventDefault();dispatch(clearPlaylist('apple'));}}>Clear Queue</div>
          </div>
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
  const playlist = useSelector((state) => state.playlist.value);
  return (
    <div id={styles.mainLine}>
      {playListData(playlist)}
>>>>>>> eb42cc4a041953e03bb2dac83cfbbef5be7febfb:components/CurrentQueue.jsx
    </div>
  );
}

export default CurrentQueue;
