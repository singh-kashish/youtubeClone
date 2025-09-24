// PlaylistPlayButton.tsx

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { PlaylistVideoWithProfile } from '../types/PlaylistsTypes';

interface Props {
  playlistVideos?: PlaylistVideoWithProfile[];
}

export const PlaylistPlayButton = ({ playlistVideos }: Props) => {
  const videoCount = playlistVideos?.length ?? 0;

  let iconClass =
    videoCount === 0
      ? "text-orange-400 hover:text-orange-500 hover:cursor-not-allowed"
      : "text-green-500 hover:cursor-pointer hover:text-green-600";

  let h6Text =
    videoCount === 0
      ? "Can't play - No Videos"
      : videoCount === 1
      ? "Play 1 Video"
      : `Play ${videoCount} Videos`;

  return (
    <div className={`flex px-2 items-center gap-2 ${iconClass}`}>
      <PlayCircleFilledIcon
        fontSize="large"
      />
      <h6 className="text-lg font-medium">
        {h6Text}
      </h6>
    </div>
  );
};
