import { useDispatch } from "react-redux";
import { Playlist, PlaylistVideos } from "../gql/graphql";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { playPlaylist } from "../../reduxReducers/playlistSlice";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import VideoIcon from "./VideoIcon";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DELETE_PLAYLIST,
  DELETE_PLAYLIST_VIDEO,
} from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_PLAYLIST_FOR_USER } from "../../graphql/queries";
import { useUser } from "@supabase/auth-helpers-react";
import { PlaylistVideo } from "../types/Playlist";
function ShowPlaylist({ playlist }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useUser();
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: [GET_PLAYLIST_FOR_USER],
  });
  const [deletePlaylistVideo] = useMutation(DELETE_PLAYLIST_VIDEO);
  const sliderLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const sliderRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div className="pb-10 mr-40 w-full">
      {playlist?.map((p) => (
        <div key={p?.id}>
          <div className="flex justify-start items-center space-x-3">
            <div className=" flex-col justify-start items-start">
              <h3 className="text-xl font-bold">{p?.playlist_name}</h3>
              <h1 className="text-lg font-semibold">{`@${p?.profiles?.username}`}</h1>
            </div>
            <div
              className="flex justify-start items-center shadow-gray-800 shadow-md rounded-md hover:cursor-pointer hover:text-green-500 hover:shadow-xl hover:shadow-gray-700"
              onClick={(e) => {
                e.preventDefault();
                dispatch(playPlaylist(p?.playlistVideos));
                if (p && p?.playlistVideos && p?.playlistVideos?.length > 0) {
                  router.push(`/video/${p?.playlistVideos[0]?.video_id}`);
                }
              }}
            >
              <PlayCircleFilledIcon
                fontSize="large"
                className="text-green-500 cursor-pointer hover:text-green-600"
              />
              <h6 className="text-lg font-medium">
                Play {`${p?.playlistVideos?.length} videos`}
              </h6>
            </div>
            {user != null && p.user === user?.id && (
              <DeleteIcon
                className="text-red-500 hover:shadow-lg hover:shadow-black cursor-pointer"
                onClick={(e) => {
                  try {
                    deletePlaylist({
                      variables: { id: p?.id },
                    });
                    p?.playlistVideos?.map((v) => {
                      deletePlaylistVideo({ variables: { id: v?.id } });
                    });
                  } catch (e) {
                    alert(e);
                  } finally {
                    toast.success("Playlist delete successful!");
                  }
                }}
              />
            )}
            {user != null && p.user === user?.id && (
              <button
                className="bg-green-500 rounded-full px-2 hover:bg-green-300"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/playlists/edit/${p.id}`);
                }}
              >
                Edit Playlist
              </button>
            )}
          </div>
          <div className="flex relative items-center py-2">
            <ArrowBackIosNewOutlinedIcon
              fontSize="large"
              onClick={sliderLeft}
              className="opacity-50 cursor-pointer hover:opacity-100 mr-2 z-50"
            />
            <div
              className="flex max-w-fit h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth space-x-4 no-scrollbar"
              id="slider"
            >
              {p?.playlistVideos?.map((video) => (
                <VideoIcon
                  video={video?.video}
                  where="home"
                  key={video?.id}
                  allowHover={false}
                />
              ))}
            </div>
            <ArrowForwardIosOutlinedIcon
              fontSize="large"
              onClick={sliderRight}
              className="opacity-50 cursor-pointer hover:opacity-100 ml-2 z-50"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ShowPlaylist;
