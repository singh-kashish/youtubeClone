// types/PlaylistTypes.ts

import { Playlist } from "./Playlist";
import { PostgrestError } from "@supabase/supabase-js";
export type AllPlaylistsType = {
  userPlaylists: Playlist[] | string;
  publicPlaylists: Playlist[] | string;
  user: object | null | string;
  loading: boolean;
};

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export interface Comment {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
}

export interface Video {
  id: string;
  created_at: string | null;
  description: string | null;
  dislikes: number | null;
  likes: number | null;
  thumbnailUrl: string | null;
  title: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
  videoUrl: string | null;
  viewCount: number | null;
}

export interface VideoWithProfile extends Video {
  profiles?: Profile | null;
  comment?: Comment[] | null;
}

export interface PlaylistVideoWithProfile {
  id: string;
  video_id: string | null;
  created_at: string;
  playlist_id: string | null;
  positionInPlaylist: number | null;
  video: VideoWithProfile | null;
}

export interface PublicPlaylistWithVideos {
  id: string;
  created_at?: string;
  user: string;
  playlist_name: string;
  playlistVisibility: boolean;
  playlistVideos: PlaylistVideoWithProfile[];
  profiles?: Profile | null; // Top-level profile for playlist owner
}

export interface LoadPublicPlaylistsResponse {
  data: PublicPlaylistWithVideos[] | null;
  error: PostgrestError | null;
}
