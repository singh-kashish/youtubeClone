// import { GET_ALL_PLAYLISTS } from "../../graphql/queries";
// import { useQuery } from "@apollo/client";
// import { usePlaylistListQuery } from "../gql/graphql";
import { useUser } from "@supabase/auth-helpers-react";
import { useMemo } from "react";
const useAllPlaylist = () => {
  const { data, loading, error } = usePlaylistListQuery();
  const user = useUser();
  // Returns 'loading' when loading ,when user isn't signed in returns [], else an array of playlists by signed in user
  const userPlaylists = useMemo(() => {
    return user
      ? data
        ? data?.playlistList?.filter((p) => {
            return user && p?.user === user?.id;
          })
        : "loading"
      : "User Not Found";
  }, [user, data]);
  // Returns [] if no other public playlists are present and while loading returns 'loading', else list of public playlists except user's own
  const publicPlaylists = useMemo(() => {
    return data
      ? data?.playlistList?.filter((p) => {
          return user===null || p?.user !== user?.id;
        })
      : 'loading';
  }, [user, data]);
  if(loading){
    return {
      userPlaylists: "loading",
      publicPlaylists: "loading",
      user,
      loading,
    };
  } else if(!error){
    return {userPlaylists,publicPlaylists,user,loading};
  } else{
    const errorMessage = new Error(error?.message);
    return errorMessage;
  }
};
export default useAllPlaylist;
