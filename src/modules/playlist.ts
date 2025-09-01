// src/modules/playlist.ts
import { supabase } from "../components/utils/supabase";
import { LoadPlaylistsResponse } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export async function loadAllPlaylists(): Promise<LoadPlaylistsResponse> {
  let loading = true;
  try {
    const { data: playlists, error, status } = await supabase
      .from("playlist")
      .select(`
        id,
        playlist_name,
        playlistVisibility,
        user,
        created_at,
        profiles (id, username, avatar_url),
        playlistVideos (id, video_id, positionInPlaylist, video (id, title, thumbnailUrl))
      `);

    loading = false;
    if (error || status !== 200) {
      throw new Error(error?.message || "Error fetching playlists");
    }

    return { playlists, loading, error };
  } catch (error: any) {
    return { playlists: null, loading: false, error: { message: error.message } as PostgrestError };
  }
}

export async function addPlaylist(playlist: { playlist_name: string; user: string; playlistVisibility: boolean }) {
  const { data, error } = await supabase
    .from("playlist")
    .insert([playlist])
    .select();
  if (error) throw error;
  return data;
}

export async function updatePlaylist(id: string, updates: Partial<{ playlist_name: string; playlistVisibility: boolean; user: string }>) {
  const { data, error } = await supabase
    .from("playlist")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function deletePlaylist(id: string) {
  await supabase
    .from("playlistVideos")
    .delete()
    .eq("playlist_id", id);
  const { data, error } = await supabase
    .from("playlist")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}
