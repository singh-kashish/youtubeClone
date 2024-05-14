import { Maybe, Playlist, PlaylistVideos, Video } from "../gql/graphql";
import VideoIcon from "./VideoIcon";
import { PlaylistVideo } from "../types/Playlist";
import useAllPlaylist from "../hooks/useAllPlaylist";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import AllPublicExceptYoursPlaylists from "./ShowPlaylist";
import ShowPlaylist from "./ShowPlaylist";
import LoadingPlaylists from "./LoadingPlaylists";
import AllPlaylistsType from "../types/AllPlaylistsType";
function AllPlaylists({ playlists }: { playlists: AllPlaylistsType}) {
  const dispatch = useDispatch();
  const router = useRouter();
  return playlists?.loading ? (
    <LoadingPlaylists />
  ) : (
    <div className="flex-col items-start justify-start w-full">
      <h1 className="text-white text-xl border-b-2 border-blue-500 text-bold">
        Your Playlists
      </h1>
      {playlists?.userPlaylists === "User Not Found" ? (
        <p className="text-red-500">Please login to see your playlists!</p>
      ) : playlists?.userPlaylists &&
        typeof playlists.userPlaylists !== "string" &&
        playlists?.userPlaylists?.length > 0 ? (
        <ShowPlaylist playlist={playlists?.userPlaylists} />
      ) : (
        <p>No playlists saved by you</p>
      )}
      <h1 className="text-white text-xl border-b-2 border-blue-500 text-bold">
        Playlists by other Users
      </h1>
      {typeof playlists?.publicPlaylists !== "string" &&
      playlists?.publicPlaylists?.length >= 0 ? (
        <ShowPlaylist playlist={playlists?.publicPlaylists} />
      ) : (
        <p className="text-red-500">No other playlists could be found!</p>
      )}
    </div>
  );
}
export default AllPlaylists;
