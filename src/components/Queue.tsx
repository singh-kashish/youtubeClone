import { useDispatch } from "react-redux";
import { Video } from "../gql/graphql";
import VideoIcon from "./VideoIcon";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useEffect, useRef, useState } from "react";
const Queue = ({ playlist }: { playlist: Array<Video> }) => {
  return (
    <div>
      {playlist?.map((vid: Video, index: number) => {
        return (
          <div className="flex items-center" key={index}>
            <VideoIcon
              video={vid}
              where="playlist"
              allowHover={false}
            />
            <ReorderIcon className="cursor-pointer hover:shadow-lg hover:shadow-red-600 rounded-full hover:bg-red-400 hover:text-gray-900" />
          </div>
        );
      })}
    </div>
  );
};
export default Queue;
