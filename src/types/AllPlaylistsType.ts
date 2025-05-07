import { Playlist } from "../gql/graphql";

type AllPlaylistsType = {
  userPlaylists: Array<Playlist> | string;
  publicPlaylists: Array<Playlist> | string;
  user: Object | null | string;
  loading: Boolean;
};
export default AllPlaylistsType;
