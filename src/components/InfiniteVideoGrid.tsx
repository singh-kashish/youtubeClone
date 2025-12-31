import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useVideoLoadHook from "../hooks/useVideoLoadHook";
import { rootState } from "../../store";
import { advanceOffset } from "../../reduxReducers/suggestedVideoSlice";
import VideoIcon from "./videos/VideoIcon";
import Shimmer from "./Shimmer";
import SortByButton from "./SortByButton";
import styles from "./styles/SuggestedVideos.module.css";
import { Video_Icon } from "../types/interaces";

const PAGE_SIZE = 12;

type Props = {
  where: "home" | "video";
};

const InfiniteVideoGrid: React.FC<Props> = ({ where }) => {
  const dispatch = useDispatch();
  const { video, loading, error, hasMore } = useVideoLoadHook(PAGE_SIZE);
  const displayList = useSelector(
    (state: rootState) => state.suggestedVideo.displayList
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          dispatch(
            advanceOffset({
              listType: displayList,
              pageSize: PAGE_SIZE,
            })
          );
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, displayList]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <main className="flex flex-col justify-end">
      <SortByButton setSortOrder={() => {}}/>

      <div className={where === "home" ? styles.home : styles.video}>
        {video.map((v:Video_Icon) => (
          <VideoIcon key={v?.id} video={v} where={where} allowHover />
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
