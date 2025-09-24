import { supabase } from "../components/utils/supabase";
import  { AllPlaylistsType,LoadPublicPlaylistsResponse, PublicPlaylistWithVideos } from "../types/PlaylistsTypes";

export const playlistService = {
  // async fetchPlaylistsByUserId(userId: string): Promise<LoadPlaylistsResponse> {
  //   const { data, error } = await supabase
  //     .from("playlist")
  //     .select("*")
  //     .eq("user", userId);

  //   return {
  //     playlists: data as AllPlaylistsType[] | null,
  //     error,
  //     loading: false,
  //   };
  // },

  // async fetchPublicPlaylists(visibility="TRUE"):Promise<LoadPublicPlaylistsResponse>{
  //   const {data, error} = await supabase
  //     .from("playlist")
  //     .select(`*,playlistVideos(*,video(*,profiles(*)))`)
  //     .eq("playlistVisibility",visibility);
  //     console.log('at module level  ',data,error);
  //     return {data,error}; 
  // },

  // Fetch all public playlists, optionally excluding a user
  async fetchPublicPlaylists(
    excludeUserId?: string
  ): Promise<LoadPublicPlaylistsResponse> {
    try {
      let query = supabase
        .from("playlist")
        .select(`*,profiles(*),playlistVideos(*,video(*,profiles(*)))`)
        .eq("playlistVisibility", true);

      if (excludeUserId) {
        query = query.neq("user", excludeUserId);
      }

      const { data, error } = await query;
      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // Fetch all playlists for a user (no visibility filter)
  async fetchAllUserPlaylists(
    userId: string
  ): Promise<LoadPublicPlaylistsResponse> {
    try {
      const { data, error } = await supabase
        .from("playlist")
        .select(`*,profiles(*),playlistVideos(*,video(*,profiles(*)))`)
        .eq("user", userId);

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
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
