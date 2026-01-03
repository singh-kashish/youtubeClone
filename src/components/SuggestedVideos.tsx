// src/components/SuggestedVideos.tsx
import InfiniteVideoGrid from "./InfiniteVideoGrid";
import { Video_Icon } from "../types/interaces";

type Props = {
  videos?: Video_Icon[];
  where: "home" | "video";
};

const SuggestedVideos: React.FC<Props> = ({ videos, where }) => {
  return <InfiniteVideoGrid videos={videos} where={where}/>;
};

export default SuggestedVideos;
