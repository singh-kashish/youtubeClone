// // src/modules/playlist.ts
// import { supabase } from "../components/utils/supabase";
// import { LoadPlaylistsResponse } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export async function loadAllPlaylists(): Promise<LoadPlaylistsResponse> {
//   let loading = true;
//   try {
//     const { data: playlists, error, status } = await supabase
//       .from("playlist")
//       .select(`
//         id,
//         playlist_name,
//         playlistVisibility,
//         user,
//         created_at,
//         profiles (
//           id,
//           username,
//           avatar_url
//         ),
//         playlistVideos (
//           id,
//           video_id,
//           positionInPlaylist,
//           video (
//             id,
//             title,
//             thumbnailUrl
//           )
//         )
//       `);
//     loading = false;
//     if (error || status !== 200) {
//       throw new Error(error?.message || "Error fetching playlists");
//     }
//     return { playlists, loading, error };
//   } catch (error: any) {
//     return { playlists: null, loading: false, error: { message: error.message } as PostgrestError };
//   }
// }

// export async function addPlaylist(playlist: { playlist_name: string; user: string; playlistVisibility: boolean }) {
//   const { data, error } = await supabase
//     .from("playlist")
//     .insert([playlist])
//     .select();
//   if (error) throw error;
//   return data;
// }

// export async function updatePlaylist(id: string, updates: Partial<{ playlist_name: string; playlistVisibility: boolean; user: string }>) {
//   const { data, error } = await supabase
//     .from("playlist")
//     .update(updates)
//     .eq("id", id)
//     .select();
//   if (error) throw error;
//   return data;
// }

// export async function deletePlaylist(id: string) {
//   await supabase
//     .from("playlistVideos")
//     .delete()
//     .eq("playlist_id", id);
//   const { data, error } = await supabase
//     .from("playlist")
//     .delete()
//     .eq("id", id)
//     .select();
//   if (error) throw error;
//   return data;
// }

// src/modules/playlistService.ts
// import { supabase } from "../components/utils/supabase";
// import { LoadPlaylistsResponse } from "../types/VideoLoadTypes";
// import AllPlaylistsType from "../types/AllPlaylistsType";

// export const playlistService = {
//   async fetchPlaylistsByUserId(userId: string): Promise<LoadPlaylistsResponse> {
//     const { data, error } = await supabase
//       .from("playlist")
//       .select("*")
//       .eq("user", userId);

//     return {
//       playlists: data as AllPlaylistsType[] | null,
//       error,
//       loading: false,
//     };
//   },

//   async createPlaylist(userId: string, playlistName: string, visibility = true): Promise<{ playlist: AllPlaylistsType | null; error: any }> {
//     const { data, error } = await supabase
//       .from("playlist")
//       .insert([{ user: userId, playlist_name: playlistName, playlistVisibility: visibility }]);

//     return {
//       playlist: data?.[0] ?? null,
//       error,
//     };
//   },

//   async deletePlaylist(playlistId: string): Promise<{ error: any }> {
//     const { error } = await supabase.from("playlist").delete().eq("id", playlistId);
//     return { error };
//   },
// };

// src/modules/playlistService.ts
// import { supabase } from "../components/utils/supabase";
// import { LoadPlaylistsResponse } from "../types/VideoLoadTypes";
// import AllPlaylistsType from "../types/AllPlaylistsType";

// export const playlistService = {
//   async fetchPlaylistsByUserId(userId: string): Promise<LoadPlaylistsResponse> {
//     const { data, error } = await supabase
//       .from("playlist")
//       .select("*")
//       .eq("user", userId);

//     return {
//       playlists: data as AllPlaylistsType[] | null,
//       error,
//       loading: false,
//     };
//   },

//   async createPlaylist(userId: string, playlistName: string, visibility = true): Promise<{ playlist: AllPlaylistsType | null; error: any }> {
//     const { data, error } = await supabase
//       .from("playlist")
//       .insert([{ user: userId, playlist_name: playlistName, playlistVisibility: visibility }]);

//     return {
//       playlist: data?.[0] ?? null,
//       error,
//     };
//   },

//   async deletePlaylist(playlistId: string): Promise<{ error: any }> {
//     const { error } = await supabase.from("playlist").delete().eq("id", playlistId);
//     return { error };
//   },
// };
// src/modules/playlist.ts
// src/modules/playlistService.ts
import { supabase } from "../components/utils/supabase";
import { LoadPlaylistsResponse } from "../types/VideoLoadTypes";
import AllPlaylistsType from "../types/AllPlaylistsType";

export const playlistService = {
  async fetchPlaylistsByUserId(userId: string): Promise<LoadPlaylistsResponse> {
    const { data, error } = await supabase
      .from("playlist")
      .select("*")
      .eq("user", userId);

    return {
      playlists: data as AllPlaylistsType[] | null,
      error,
      loading: false,
    };
  },

  async createPlaylist(userId: string, playlistName: string, visibility = true): Promise<{ playlist: AllPlaylistsType | null; error: any }> {
    const { data, error } = await supabase
      .from("playlist")
      .insert([{ user: userId, playlist_name: playlistName, playlistVisibility: visibility }]);

    return {
      playlist: data?.[0] ?? null,
      error,
    };
  },

  async deletePlaylist(playlistId: string): Promise<{ error: any }> {
    const { error } = await supabase.from("playlist").delete().eq("id", playlistId);
    return { error };
  },
};
