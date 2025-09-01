// // src/hooks/useVideoSearchHook.ts
// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { rootState } from "../../store";

// const useVideoSearchHook = (text: string) => {
//   // object with keys = listType
//   const videosObj = useSelector((s: rootState) => s.suggestedVideo.videos);

//   // flatten everything into one array, drop null/undefined
//   const allVideos = useMemo(
//     () =>
//       Object.values(videosObj)
//         .flat()
//         .filter(Boolean), // remove empty slots
//     [videosObj]
//   );

//   const data = useMemo(() => {
//     if (!text) return allVideos;
//     const lc = text.toLowerCase();
//     return allVideos.filter(
//       (v: any) =>
//         v.title?.toLowerCase().includes(lc) ||
//         v.description?.toLowerCase().includes(lc)
//     );
//   }, [text, allVideos]);

//   return data;
// };

// export default useVideoSearchHook;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../store";
import { VideoWithProfile } from "../types/VideoRedux";

const useVideoSearchHook = (text: string) => {
  const obj = useSelector((s: rootState) => s.suggestedVideo.videos);
  const list = useMemo(
    () => Object.values(obj).flat().filter(Boolean) as VideoWithProfile[],
    [obj]
  );

  const q = text?.toLowerCase();
  if (!q) return list;
  return list.filter(
    (v) =>
      v.title?.toLowerCase().includes(q) ||
      v.description?.toLowerCase().includes(q)
  );
};
export default useVideoSearchHook;
