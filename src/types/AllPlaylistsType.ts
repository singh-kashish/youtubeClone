// import { Database } from "../../lib/database.types";
// import {Playlist} from "./Playlist";
// export type PlaylistVideos = Database['public']['Tables']['playlistVideos']['Row'];
// export type AllPlaylistsType = {
//   userPlaylists: Array<Playlist> | string;
//   publicPlaylists: Array<Playlist> | string;
//   user: Object | null | string;
//   loading: Boolean;
// };
// export default AllPlaylistsType;
// src/types/AllPlaylistTypes.ts
// import { Playlist } from "./Playlist";

// export type AllPlaylistsType = {
//   userPlaylists: Array<Playlist> | string;
//   publicPlaylists: Array<Playlist> | string;
//   user: object | null | string;
//   loading: boolean;
// };
// export default AllPlaylistsType;

// chatgpt generated code below:-
import { Playlist } from "./Playlist";

export type AllPlaylistsType = {
  userPlaylists: Playlist[] | string;
  publicPlaylists: Playlist[] | string;
  user: object | null | string;
  loading: boolean;
};

export default AllPlaylistsType;
