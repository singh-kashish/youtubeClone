import React, { useState } from "react";
import styles from "./styles/SuggestedVideos.module.css";
import VideoIcon from "./videos/VideoIcon";
import Shimmer from "./Shimmer";
import useVideoLoadHook from "../hooks/useVideoLoadHook";
import SortByButton from "./SortByButton";
import { typeOfList } from "../types/VideoLoadTypes";
import {useSelector} from "react-redux";
import { store, rootState } from "../../store";
import { changeDisplayList } from "../../reduxReducers/suggestedVideoSlice";
type SuggestedVideoProps={
  where: string;
};
const SuggestedVideos:React.FC<SuggestedVideoProps> = ({where}) => {
  const [index,setIndex]=useState<number>(0);
  const [offset,setOffset]=useState<number>(11);
  const [sortOrder,setSortOrder]=useState<boolean>(false);
  const displayListType:typeOfList = useSelector((store:rootState)=>store.suggestedVideo.displayList);
  let { video, error,loading } = useVideoLoadHook(index,offset,sortOrder);
  if (where === "Video") {
    if (loading) {
      return (
        <div
          className="flex flex-col items-center justify-center text-xxl my-2"
          id={styles.wobble}
        >
          <Shimmer />
        </div>
      );
    } else if(error===null) {
      return (
        <div id={styles.video}>
          <SortByButton className="w-fit" setSortOrder={setSortOrder}  />
          {video?.map((pie) => (
            <VideoIcon video={pie} where="video" key={pie?.id} allowHover={true} />
          ))}
        </div>
      );
    } else if(error){
      return(<div>
        <h4>Database Error</h4>
        <h1>{`${error?.code}  -  ${error?.message}`}</h1>
        <p>{error?.details}</p>
      </div>
      )
    } else return(<></>);
  } else if (where === "Home") {
    if (loading) {
      return (
        <div className="ml-[225px] mt-2 grid grid-cols-3 gap-2 w-fit min-h-screen  bg-zinc-900">
          <Shimmer />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-end justify-center lg:mt-6">
          <SortByButton setSortOrder={setSortOrder} />
          <div id={styles.home} className="bg-zinc-900">
            {video?.map((pie) => (
              <VideoIcon
                video={pie}
                where="home"
                className="mt-1 max-w-fit"
                key={pie?.id}
              />
            ))}
          </div>
        </div>
      );
    }
  } else {
    return <div className="bg-zinc-900	min-h-screen w-full">Lost!</div>;
  }
};

export default SuggestedVideos;

