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
