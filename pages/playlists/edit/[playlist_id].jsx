import { useRouter } from "next/router";
// import { useMutation, useQuery } from "@apollo/client";
// import { GET_PLAYLIST_BY_ID } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { TextField } from "@mui/material";
import VideoIcon from "../../../src/components/VideoIcon";
import Delete from "@mui/icons-material/Delete";
// import {
//   DELETE_PLAYLIST_VIDEO,
//   UPDATE_PLAYLIST,
// } from "../../../graphql/mutations";
import toast from "react-hot-toast";
const EditPlaylist = () => {
  const router = useRouter();
  const playlistId = router.query.playlist_id;
  const [playlistName, setPlaylistName] = useState("loading");
  const [playlistVisibility, setPlaylistVisibility] = useState();
  // const { data, loading, error } = useQuery(GET_PLAYLIST_BY_ID, {
  //   variables: { id: playlistId },
  // });
  // const [deletePlaylistVideo] = useMutation(DELETE_PLAYLIST_VIDEO, {
  //   refetchQueries: [GET_PLAYLIST_BY_ID],
  // });
  const user = useUser();
  console.log(data);
  useEffect(() => {
    if (!loading) {
      setPlaylistName(data?.playlist?.playlist_name);
      setPlaylistVisibility(data?.playlist?.playlistVisibility);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold">Edit Playlist - {playlistName}</h3>
      {user !== null && user.id === data?.playlist?.user ? (
        <div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="playlist_name"
            label="Playlist Name"
            type="text"
            fullWidth
            variant="standard"
            value={playlistName}
            onChange={(e) => {
              e.preventDefault();
              setPlaylistName(e?.target?.value);
            }}
          />
          <label className="text-gray-200 mr-2 text-md">
            Playlist Visibilty:
          </label>
          <select
            className="bg-blue-300 rounded-full px-4 py-2 mb-2"
            name="playlist_visiblity"
            label="Playlist Visiblity"
            value={playlistVisibility}
            onChange={(e) => {
              setPlaylistVisibility(e?.target?.value);
            }}
          >
            <option value={false}>Only to you</option>
            <option value={true}>Everyone</option>
          </select>
          <button className="bg-red-500 rounded-full px-2 ml-1 hover:bg-red-300">
            Update Playlist
          </button>
          {data?.playlist?.playlistVideos?.map((vid, index) => {
            return (
              <div
                key={vid?.video_id}
                className="flex items-center justify-between"
              >
                <VideoIcon
                  video={vid?.video}
                  where="playlist"
                  className="mt-1 max-w-fit"
                  allowHover={false}
                />
                <p className="text-black	">{index + 1}</p>
                <Delete
                  className="text-red-400 cursor-pointer hover:shadow-lg hover:shadow-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(vid);
                    toast.caller("Deleting this video from Playlist");
                    try {
                      const d = deletePlaylistVideo({
                        variables: { id: vid?.id },
                      });
                    } catch (e) {
                      toast.error(e?.message);
                    } finally {
                      toast.success("Deleted this video from playlist");
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <h7>You're not the owner of this playlist.</h7>
      )}
    </div>
  );
};
export default EditPlaylist;
