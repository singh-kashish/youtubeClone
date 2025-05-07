import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEOS } from "../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../../reduxReducers/suggestedVideoSlice";

const useVideoLoadHook = () => {
  const { loading, error, data } = useQuery(GET_VIDEOS);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading) dispatch(loadVideos(data?.videoList));
  }, [data]);
  let videos = useSelector((state) => state.suggestedVideo.videos);
  console.log("videos", videos);
  return { videos, loading, error };

};
export default useVideoLoadHook;
