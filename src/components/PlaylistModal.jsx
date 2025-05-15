import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import VideoIcon from "./videos/VideoIcon";
import { useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import uuid from "./uuid";
import { rootState } from "../../store";
export default function PlaylistModal({ why }) {
  const [open, setOpen] = React.useState(false);
  // const [insertPlaylist] = useMutation(ADD_PLAYLIST);
  // const [insertPlaylistVideos, { data, loading, error }] = useMutation(
  //   ADD_VIDEOS_TO_PLAYLIST,
  //   {
  //     refetchQueries: [GET_ALL_PLAYLISTS],
  //   }
  // );
  const user = useUser();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const playlist = useSelector((state) => state.playlist.value);
  return (
    <React.Fragment>
      <div
        className="bg-green-300 px-4 py-2 hover:shadow-lg shadow-inner rounded-full hover:bg-green-500 hover:cursor-pointer text-black"
        onClick={handleClickOpen}
      >
        Add to Playlist
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const { playlist_name, playlist_visiblity } = formJson;
            const toInsertId = uuid();
            try {
              const ad=insertPlaylist({
                variables: {
                  id: toInsertId,
                  playlist_name: playlist_name,
                  user: user?.id,
                  playlistVisibility: playlist_visiblity,
                },
              }).then((res) => {
                const insertedPlaylistId = res?.data?.insertPlaylist?.id;
                playlist.map((video, index) => {
                  const toInsertId = uuid();
                  insertPlaylistVideos({
                    variables: {
                      id: toInsertId,
                      playlist_id: insertedPlaylistId,
                      video_id: video.id,
                      positionInPlaylist: index + 1,
                    },
                  });
                });
              });
              console.log(ad);
            } catch (error) {
              toast.error(error?.message);
            } finally {
              toast.success("Playlist added successfully");
            }
            handleClose();
          },
        }}
        className="rouned-full"
      >
        <DialogTitle className="bg-green-200">{why}</DialogTitle>
        <DialogContent className="bg-gray-200 text-white">
          <DialogContentText>
            The following videos will be saved with the playlist name as filled
            below:-
          </DialogContentText>
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
          />
          <label className="text-black mr-2 text-md">Playlist Visibilty:</label>
          <select
            className="bg-black rounded-full px-4 py-2 mb-2"
            name="playlist_visiblity"
            label="Playlist Visiblity"
          >
            <option value={false}>Only to you</option>
            <option value={true}>Everyone</option>
          </select>
          {playlist.map((vid, index) => {
            return (
              <div key={vid.id} className="flex items-center justify-between">
                <VideoIcon
                  video={vid}
                  where="playlist"
                  className="mt-1 max-w-fit"
                  allowHover={false}
                />
                <p className="text-black	">{index + 1}</p>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions className="bg-gray-800">
          <Button
            onClick={handleClose}
            className="rounded-full bg-red-200 hover:bg-red-600 hover:shadow-lg text-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-full bg-green-200 hover:bg-green-400 hover:shadow-lg text-black"
          >
            Save this Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
