import { useMemo } from "react";
import { useSelector } from "react-redux";
const useVideoSearchHook = (text) =>{
    let videos = useSelector(state=>state.suggestedVideo.videos);
    const data = useMemo(()=>{
    return (text ? videos.filter(v=>{
      return v.title.toLowerCase().includes(text.toLowerCase()) || 
      v.description.toLowerCase().includes(text.toLowerCase())
    })
    :videos)
  },[text,videos]);
    return data;
}
export default useVideoSearchHook;