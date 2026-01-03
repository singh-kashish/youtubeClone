import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store";
import { advanceOffset } from "../../reduxReducers/suggestedVideoSlice";
import VideoIcon from "./videos/VideoIcon";
import Shimmer from "./Shimmer";
import SortByButton from "./SortByButton";
import useVideoLoadHook from "../hooks/useVideoLoadHook";
import styles from "./styles/SuggestedVideos.module.css";

const PAGE_SIZE = 12;

type Props = {
  where: "home" | "video";
};

const InfiniteVideoGrid: React.FC<Props> = ({ where }) => {
  const dispatch = useDispatch();
  useVideoLoadHook();

  const { videos, loading, hasMore } = useSelector(
    (state: rootState) => state.suggestedVideo
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  const uniqueVideos = useMemo(() => {
    const map = new Map();
    console.log(videos);
    videos.forEach((v:any) => {
      if (v?.id) map.set(v.id, v);
    });
    return Array.from(map.values());
  }, [videos]);

  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          dispatch(advanceOffset());
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, dispatch]);

  return (
    <main className="flex flex-col">
      <div className="flex justify-end">
        <SortByButton />
      </div>

      <div className={where === "home" ? styles.home : styles.video}>
        {uniqueVideos.map(video => (
          <VideoIcon
            key={video.id}
            video={video}
            where={where}
            allowHover
          />
        ))}
      </div>

      {loading && <Shimmer />}

      {!hasMore && (
        <p className="text-gray-400 text-center mt-4">
          No more videos
        </p>
      )}

      <div ref={observerRef} className="h-10" />
    </main>
  );
};

export default InfiniteVideoGrid;
