// import { Video } from "./VideoLoadTypes"
// import { Database } from "../../lib/database.types";
// export type Playlist = Database['public']['Tables']['playlist']['Row'];
// export type PlaylistVideo={
//     id: string
//     video:Video
// };

// src/types/Playlist.ts
// import { Database } from "../../lib/database.types";
// import { Video } from "./VideoLoadTypes";

// export type Playlist = Database['public']['Tables']['playlist']['Row'];
// export type PlaylistVideo = {
//   id: string;
//   video: Video;
// };

// chatgpt code below:-
import { Database } from "../../lib/database.types";
import { Video } from "./VideoLoadTypes";

export type Playlist = Database["public"]["Tables"]["playlist"]["Row"];

export type PlaylistVideo = {
  id: string;
  video: Video;
};

