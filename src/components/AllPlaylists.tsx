import VideoIcon from "./videos/VideoIcon";
import { PlaylistVideo } from "../types/Playlist";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import AllPublicExceptYoursPlaylists from "./ShowPlaylist";
import ShowPlaylist from "./ShowPlaylist";
import LoadingPlaylists from "./LoadingPlaylists";
import {AllPlaylistsType} from "../types/PlaylistsTypes";
import { useUserPlaylists } from "../hooks/useUserPlaylist";
import { usePublicPlaylists } from "../hooks/usePublicPlaylist";

function AllPlaylists() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useUser();
  console.log('l>',user);
  console.log('ddd',user?.id);
  const currentUserId = "2ecb3438-d8ae-4c06-9042-a0340e953051"; // get from auth
  const { publicPlaylists: userPublicPlaylist, privatePlaylists, error:userError, loading:userLoading } = useUserPlaylists(user?.id||'');
  const { publicPlaylists, error:publicError, loading:publicLoading } = usePublicPlaylists(user?.id||'');
  console.log('user',userPublicPlaylist,privatePlaylists,userError,userLoading);
  console.log('public',publicLoading,publicError,publicPlaylists);
  return (userLoading || publicLoading)? (
    <LoadingPlaylists />
  ) : (
    <div className="flex-col items-start justify-start w-full">
      <h1 className="text-slate-300 text-xl border-b-4 border-blue-500 font-bold w-fit rounded-sm">
        Your Playlists
      </h1>
      {user===null ? (
        <p className="text-red-500">Please login to see your playlists!</p>
      ) : userPublicPlaylist &&
        userPublicPlaylist?.length > 0 ? (
        <div>
          <h4 className="text-xl font-semibold border-b-2 border-green-300 w-fit rounded-md text-gray-500">Your Public Playlists</h4>
        <ShowPlaylist playlist={userPublicPlaylist} />
        <h4 className="text-xl font-semibold border-b-2 border-green-300 w-fit rounded-md text-gray-500">Your Private Playlists</h4>
        <ShowPlaylist playlist={privatePlaylists}/>
        </div>
      ) : (
        <p>No playlists saved by you</p>
      )}
      <h1 className="text-slate-300 text-xl border-b-2 border-blue-500 font-bold rounded-md w-fit">
        Playlists by other Users
      </h1>
      { publicPlaylists && publicPlaylists?.length > 0 ? (
        <ShowPlaylist playlist={publicPlaylists} />
      ) : (
        <p className="text-red-500">No other playlists could be found!</p>
      )}
    </div>
  );
}
export default AllPlaylists;
