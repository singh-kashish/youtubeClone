// import React, { useRef, useEffect, useState } from "react";
// import ReactPlayer from "react-player";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { rootState } from "../../../store";
// import styles from "../../../pages/video/[video_id].module.css"; 
// interface PlaylistVideo {
//   id: string;
//   videoUrl: string;
//   [key: string]: any;
// }

// interface VideoPlayerWithPersistenceProps {
//   videoUrl: string;
//   videoId: string;
//   onEnded?: () => void;
//   style?: React.CSSProperties;
// }

// const STORAGE_KEY_PREFIX = "video-progress-";

// const VideoPlayerWithPersistence: React.FC<VideoPlayerWithPersistenceProps> = ({
//   videoUrl,
//   videoId,
//   onEnded,
//   style,
// }) => {
//   const playerRef = useRef<ReactPlayer>(null);
//   const nativeVideoRef = useRef<HTMLVideoElement>(null);
//   const [startTime, setStartTime] = useState(0);

//   // Redux playlist (ensure correct type)
//   const playlist = useSelector((state: rootState) => state.playlist.value as PlaylistVideo[]);
//   const router = useRouter();

//   // Find current video index in playlist
//   const currentIndex = playlist.findIndex((v) => v.id === videoId);

//   // Load saved position on mount
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY_PREFIX + videoId);
//     if (saved) {
//       setStartTime(parseFloat(saved));
//     }
//   }, [videoId]);

//   // Save position for ReactPlayer
//   const handleProgress = (state: { playedSeconds: number }) => {
//     localStorage.setItem(
//       STORAGE_KEY_PREFIX + videoId,
//       state.playedSeconds.toString()
//     );
//   };

//   // Seek for ReactPlayer
//   const handleReady = () => {
//     if (playerRef.current && startTime > 0) {
//       playerRef.current.seekTo(startTime, "seconds");
//     }
//   };

//   // Save position for native <video>
//   const handleTimeUpdate = () => {
//     if (nativeVideoRef.current) {
//       localStorage.setItem(
//         STORAGE_KEY_PREFIX + videoId,
//         nativeVideoRef.current.currentTime.toString()
//       );
//     }
//   };

//   // Seek for native <video>
//   useEffect(() => {
//     if (nativeVideoRef.current && startTime > 0) {
//       nativeVideoRef.current.currentTime = startTime;
//     }
//   }, [startTime, videoUrl]);

//   // On end: clear position and advance queue if needed
//   const handleEnded = () => {
//     localStorage.removeItem(STORAGE_KEY_PREFIX + videoId);
//     if (playlist && currentIndex !== -1 && currentIndex < playlist.length - 1) {
//       const nextVideo = playlist[currentIndex + 1];
//       if (nextVideo && nextVideo.id) {
//         router.push(`/video/${nextVideo.id}`);
//         return;
//       }
//     }
//     if (onEnded) onEnded();
//   };

//   // Decide which player to use
//   if (videoUrl.includes("supabase")) {
//     const lastDotIndx = videoUrl.lastIndexOf(".") + 1;
//     const toUseType = videoUrl.substr(lastDotIndx);
//     return (
//       <div id={styles.video}>
//         <video
//           ref={nativeVideoRef}
//           controls
//           src={videoUrl}
//           id={styles.video}
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={() => {
//             if (nativeVideoRef.current && startTime > 0) {
//               nativeVideoRef.current.currentTime = startTime;
//             }
//           }}
//           style={{ minWidth: "100%", height: "70vh" }}
//           onEnded={handleEnded}
//         >
//           <source src={videoUrl} type={`video/${toUseType}`} />
//         </video>
//       </div>
//     );
//   }

//   return (
//     <div id={styles.video}>
//       <ReactPlayer
//         ref={playerRef}
//         url={videoUrl}
//         playing={true}
//         controls={true}
//         loop={false}
//         onProgress={handleProgress}
//         onReady={handleReady}
//         onEnded={handleEnded}
//         width="100%"
//         height="100%"
//       />
//     </div>
//   );
// };

// export default VideoPlayerWithPersistence;


import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { rootState } from "../../../store";

const KEY = "progress-";

interface Props {
  videoUrl: string;
  videoId: string;
  height?: string;
}

const Player: React.FC<Props> = ({ videoUrl, videoId, height = "70vh" }) => {
  const list = useSelector((s: rootState) => s.playlist.value as { id: string }[]);
  const idx = list.findIndex((v) => v.id === videoId);
  const r = useRouter();

  /* ---------- restore position ---------- */
  const [start] = useState(() => parseFloat(localStorage.getItem(KEY + videoId) ?? "0"));

  /* ---------- save position helpers ---------- */
  const save = (sec: number) => localStorage.setItem(KEY + videoId, String(sec));
  const clear = () => localStorage.removeItem(KEY + videoId);

  /* ---------- advance queue ---------- */
  const nextVideo = () => {
    clear();
    if (idx !== -1 && idx < list.length - 1) r.push(`/video/${list[idx + 1].id}`);
  };

  /* ---------- native / react-player switch ---------- */
  if (videoUrl.includes("supabase")) {
    const mime = "video/" + videoUrl.split(".").pop();
    const vRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const el = vRef.current;
      if (el && start) el.currentTime = start;
    }, [start]);

    return (
      <video
        ref={vRef}
        controls
        src={videoUrl}
        style={{ width: "100%", height }}
        onTimeUpdate={(e) => save((e.target as HTMLVideoElement).currentTime)}
        onEnded={nextVideo}
      >
        <source src={videoUrl} type={mime} />
      </video>
    );
  }

  const pRef = useRef<ReactPlayer>(null);
  return (
    <ReactPlayer
      ref={pRef}
      url={videoUrl}
      playing
      controls
      width="100%"
      height={height}
      onReady={() => start && pRef.current?.seekTo(start, "seconds")}
      onProgress={(s) => save(s.playedSeconds)}
      onEnded={nextVideo}
    />
  );
};

export default Player;
